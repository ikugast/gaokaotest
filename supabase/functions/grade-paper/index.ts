import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type QuestionRow = {
  id: string;
  paper_id: string;
  question_no: number;
  title: string;
  question_type: string;
  prompt_latex: string;
  score: number;
  options_json: string[] | null;
};

type AnswerKeyRow = {
  question_id: string;
  reference_answer: string | null;
  scoring_rubric: string | null;
};

type ModelConfigRow = {
  provider_name: string;
  base_url: string;
  model_name: string;
  system_prompt: string;
  secret_name: string;
  temperature: number | null;
  max_tokens: number | null;
};

type JudgeResult = {
  questionId: string;
  totalScore: number;
  maxScore: number;
  dimensions: Array<{
    name: string;
    score: number;
    reason: string;
  }>;
  summary: string;
  confidence?: number;
  updatedAt: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json; charset=utf-8",
};

const providerLabels: Record<string, string> = {
  doubao: "Doubao",
  deepseek: "DeepSeek",
};

function createSupabaseAdmin() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase 服务端环境变量缺失。");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function trimBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/$/, "");
}

function buildChatUrl(baseUrl: string) {
  const normalized = trimBaseUrl(baseUrl);
  return normalized.endsWith("/chat/completions")
    ? normalized
    : `${normalized}/chat/completions`;
}

async function requestChatCompletion(config: ModelConfigRow, messages: ChatMessage[]) {
  const apiKey = Deno.env.get(config.secret_name);
  if (!apiKey) {
    throw new Error(`Supabase Secret 缺失：${config.secret_name}`);
  }

  const payload: Record<string, unknown> = {
    model: config.model_name,
    messages,
  };

  if (config.temperature !== null) {
    payload.temperature = config.temperature;
  }

  if (config.max_tokens !== null) {
    payload.max_tokens = config.max_tokens;
  }

  const response = await fetch(buildChatUrl(config.base_url), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const rawText = await response.text();
  if (!response.ok) {
    throw new Error(`模型调用失败：${response.status} ${rawText}`);
  }

  const parsed = JSON.parse(rawText) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = parsed.choices?.[0]?.message?.content?.trim();
  if (!content) {
    throw new Error("模型返回为空。");
  }

  return content;
}

function buildAnswerMessages(question: QuestionRow, config: ModelConfigRow): ChatMessage[] {
  return [
    { role: "system", content: config.system_prompt },
    {
      role: "user",
      content: [
        `题目标题：${question.title}`,
        `题目类型：${question.question_type}`,
        `题目内容：${question.prompt_latex}`,
        question.options_json?.length
          ? `选项：${question.options_json.map((item, index) => `${String.fromCharCode(65 + index)}. ${item}`).join("\n")}`
          : "",
        "请直接输出最终答案。",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

function buildJudgeMessages(
  question: QuestionRow,
  answerKey: AnswerKeyRow | undefined,
  answerText: string,
  config: ModelConfigRow,
  answerLabel: string,
): ChatMessage[] {
  return [
    {
      role: "system",
      content: `${config.system_prompt}

请严格输出 JSON，不要使用 Markdown 代码块。JSON 结构如下：
{
  "totalScore": 5,
  "maxScore": 5,
  "dimensions": [
    { "name": "正确性", "score": 3, "reason": "..." }
  ],
  "summary": "总体点评",
  "confidence": 0.9
}`,
    },
    {
      role: "user",
      content: [
        `题目标题：${question.title}`,
        `题目类型：${question.question_type}`,
        `题目满分：${question.score}`,
        `题目内容：${question.prompt_latex}`,
        `参考答案：${answerKey?.reference_answer ?? "未提供"}`,
        `评分标准：${answerKey?.scoring_rubric ?? `总分 ${question.score} 分，请按正确性、完整性、逻辑性评分。`}`,
        `${answerLabel}：${answerText}`,
        `请输出合法 JSON。maxScore 必须等于 ${question.score}，totalScore 必须在 0 到 ${question.score} 之间。`,
      ].join("\n\n"),
    },
  ];
}

function extractJson(content: string) {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return content.slice(firstBrace, lastBrace + 1);
  }

  return content.trim();
}

function parseJudgeResult(content: string, questionId: string): JudgeResult {
  const parsed = JSON.parse(extractJson(content)) as Omit<JudgeResult, "questionId" | "updatedAt">;

  return {
    questionId,
    totalScore: parsed.totalScore ?? 0,
    maxScore: parsed.maxScore ?? 0,
    dimensions: Array.isArray(parsed.dimensions) ? parsed.dimensions : [],
    summary: parsed.summary ?? "",
    confidence: parsed.confidence,
    updatedAt: new Date().toISOString(),
  };
}

async function loadPaperContext(supabase: ReturnType<typeof createSupabaseAdmin>, paperId: string) {
  const [{ data: paper, error: paperError }, { data: questions, error: questionError }, { data: answerKeys, error: answerKeyError }] =
    await Promise.all([
      supabase.from("exam_papers").select("id, label").eq("id", paperId).single(),
      supabase
        .from("exam_questions")
        .select("id, paper_id, question_no, title, question_type, prompt_latex, score, options_json")
        .eq("paper_id", paperId)
        .order("question_no"),
      supabase
        .schema("app_private")
        .from("exam_answer_keys")
        .select("question_id, reference_answer, scoring_rubric"),
    ]);

  if (paperError || !paper) {
    throw new Error("试卷不存在。");
  }
  if (questionError || !questions) {
    throw new Error("试卷题目读取失败。");
  }
  if (answerKeyError || !answerKeys) {
    throw new Error("标准答案读取失败。");
  }

  const answerKeyMap = new Map(answerKeys.map((item) => [item.question_id, item]));

  return {
    paper,
    questions: questions as QuestionRow[],
    answerKeyMap,
  };
}

async function loadModelConfig(
  supabase: ReturnType<typeof createSupabaseAdmin>,
  role: "answer" | "judge",
  paperId: string,
  providerName?: string,
) {
  let query = supabase
    .schema("app_private")
    .from("ai_model_configs")
    .select("provider_name, base_url, model_name, system_prompt, secret_name, temperature, max_tokens, paper_id")
    .eq("model_role", role)
    .eq("enabled", true);

  if (providerName) {
    query = query.eq("provider_name", providerName);
  }

  const { data, error } = await query;
  if (error || !data?.length) {
    throw new Error(role === "answer" ? "答题模型尚未在 Supabase 配置。" : "判卷模型尚未在 Supabase 配置。");
  }

  const paperSpecific = data.find((item) => item.paper_id === paperId);
  const fallback = data.find((item) => item.paper_id === null);
  const config = paperSpecific ?? fallback;

  if (!config) {
    throw new Error(role === "answer" ? "当前试卷没有可用的答题模型。" : "当前试卷没有可用的判卷模型。");
  }

  return config as ModelConfigRow;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await request.json();
    const paperId = String(payload.paperId ?? "");
    if (!paperId) {
      throw new Error("paperId 不能为空。");
    }

    const supabase = createSupabaseAdmin();
    const { paper, questions, answerKeyMap } = await loadPaperContext(supabase, paperId);

    if (payload.action === "grade-user-paper") {
      const judgeConfig = await loadModelConfig(supabase, "judge", paperId);
      const sourceAnswers = (payload.answers ?? {}) as Record<string, string>;
      const answers: Record<string, string> = {};
      const judgeResults: Record<string, JudgeResult> = {};

      for (const question of questions) {
        const answer = String(sourceAnswers[question.id] ?? "");
        answers[question.id] = answer;
        const judgeContent = await requestChatCompletion(
          judgeConfig,
          buildJudgeMessages(
            question,
            answerKeyMap.get(question.id),
            answer,
            judgeConfig,
            "用户答案",
          ),
        );
        judgeResults[question.id] = parseJudgeResult(judgeContent, question.id);
      }

      const totalScore = Object.values(judgeResults).reduce(
        (sum, item) => sum + item.totalScore,
        0,
      );
      const maxScore = questions.reduce((sum, question) => sum + Number(question.score ?? 0), 0);

      return new Response(
        JSON.stringify({
          respondent: "用户",
          respondentType: "user",
          paperId: paper.id,
          paperLabel: paper.label,
          totalScore,
          maxScore,
          submittedAt: new Date().toISOString(),
          answers,
          judgeResults,
        }),
        { headers: corsHeaders },
      );
    }

    if (payload.action === "run-provider-paper") {
      const providerId = String(payload.providerId ?? "");
      if (!providerId) {
        throw new Error("providerId 不能为空。");
      }
      if (!(providerId in providerLabels)) {
        throw new Error("当前仅支持 doubao 和 deepseek。");
      }

      const answerConfig = await loadModelConfig(supabase, "answer", paperId, providerId);
      const judgeConfig = await loadModelConfig(supabase, "judge", paperId);
      const answers: Record<string, string> = {};
      const judgeResults: Record<string, JudgeResult> = {};

      for (const question of questions) {
        const answer = await requestChatCompletion(
          answerConfig,
          buildAnswerMessages(question, answerConfig),
        );
        answers[question.id] = answer;
        const judgeContent = await requestChatCompletion(
          judgeConfig,
          buildJudgeMessages(
            question,
            answerKeyMap.get(question.id),
            answer,
            judgeConfig,
            `${providerLabels[providerId] ?? providerId} 答案`,
          ),
        );
        judgeResults[question.id] = parseJudgeResult(judgeContent, question.id);
      }

      const totalScore = Object.values(judgeResults).reduce(
        (sum, item) => sum + item.totalScore,
        0,
      );
      const maxScore = questions.reduce((sum, question) => sum + Number(question.score ?? 0), 0);

      return new Response(
        JSON.stringify({
          respondent: providerLabels[providerId] ?? providerId,
          respondentType: "model",
          providerId,
          paperId: paper.id,
          paperLabel: paper.label,
          totalScore,
          maxScore,
          submittedAt: new Date().toISOString(),
          answers,
          judgeResults,
        }),
        { headers: corsHeaders },
      );
    }

    throw new Error("不支持的 action。");
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "未知错误",
      }),
      {
        status: 400,
        headers: corsHeaders,
      },
    );
  }
});
