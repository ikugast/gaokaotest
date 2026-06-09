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

type PaperAnswerMap = Record<string, string>;
type PaperJudgeMap = Record<string, JudgeResult>;

const MAX_QUESTIONS_PER_BATCH = 5;

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

function chunkItems<T>(items: T[], chunkSize: number) {
  const result: T[][] = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    result.push(items.slice(index, index + chunkSize));
  }
  return result;
}

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

function formatQuestionForPrompt(question: QuestionRow) {
  return [
    `questionId: ${question.id}`,
    `title: ${question.title}`,
    `type: ${question.question_type}`,
    `score: ${question.score}`,
    `prompt: ${question.prompt_latex}`,
    question.options_json?.length
      ? `options:\n${question.options_json.map((item, index) => `${String.fromCharCode(65 + index)}. ${item}`).join("\n")}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function buildPaperAnswerMessages(questions: QuestionRow[], config: ModelConfigRow): ChatMessage[] {
  return [
    {
      role: "system",
      content: `${config.system_prompt}

请严格输出 JSON，不要使用 Markdown 代码块。JSON 结构如下：
{
  "answers": {
    "question-id-1": "答案",
    "question-id-2": "答案"
  }
}

要求：
1. 必须覆盖所有 questionId。
2. 单选题只返回一个选项字母。
3. 多选题只返回全部选项字母，格式如 A,B。
4. 填空题只返回结果。
5. 解答题返回必要步骤和最终答案。`,
    },
    {
      role: "user",
      content: [
        "请完成整张试卷作答，并按指定 JSON 返回。",
        ...questions.map((question, index) => `【第 ${index + 1} 题】\n${formatQuestionForPrompt(question)}`),
      ].join("\n\n"),
    },
  ];
}

function buildPaperJudgeMessages(
  questions: QuestionRow[],
  answerKeyMap: Map<string, AnswerKeyRow>,
  answers: PaperAnswerMap,
  config: ModelConfigRow,
  answerLabel: string,
): ChatMessage[] {
  return [
    {
      role: "system",
      content: `${config.system_prompt}

请严格输出 JSON，不要使用 Markdown 代码块。JSON 结构如下：
{
  "results": {
    "question-id-1": {
      "totalScore": 5,
      "maxScore": 5,
      "dimensions": [
        { "name": "正确性", "score": 3, "reason": "..." }
      ],
      "summary": "总体点评",
      "confidence": 0.9
    }
  }
}

要求：
1. 必须覆盖所有 questionId。
2. 每题 maxScore 必须等于该题满分。
3. totalScore 必须在 0 到 maxScore 之间。`,
    },
    {
      role: "user",
      content: questions
        .map((question, index) => {
          const answerKey = answerKeyMap.get(question.id);
          return [
            `【第 ${index + 1} 题】`,
            `questionId: ${question.id}`,
            `title: ${question.title}`,
            `type: ${question.question_type}`,
            `maxScore: ${question.score}`,
            `prompt: ${question.prompt_latex}`,
            `referenceAnswer: ${answerKey?.reference_answer ?? "未提供"}`,
            `scoringRubric: ${answerKey?.scoring_rubric ?? `总分 ${question.score} 分，请按正确性、完整性、逻辑性评分。`}`,
            `${answerLabel}: ${answers[question.id] ?? ""}`,
          ].join("\n");
        })
        .join("\n\n"),
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

function parsePaperAnswers(content: string, questions: QuestionRow[]) {
  const parsed = JSON.parse(extractJson(content)) as {
    answers?: Record<string, unknown> | Array<{ questionId?: string; answer?: string }>;
  } | Record<string, unknown>;

  const rawAnswers = "answers" in parsed ? parsed.answers : parsed;
  const answers: PaperAnswerMap = {};

  if (Array.isArray(rawAnswers)) {
    rawAnswers.forEach((item) => {
      if (item?.questionId) {
        answers[item.questionId] = String(item.answer ?? "").trim();
      }
    });
  } else if (rawAnswers && typeof rawAnswers === "object") {
    Object.entries(rawAnswers).forEach(([questionId, answer]) => {
      answers[questionId] = String(answer ?? "").trim();
    });
  }

  questions.forEach((question) => {
    if (!(question.id in answers)) {
      answers[question.id] = "";
    }
  });

  return answers;
}

function parsePaperJudgeResults(content: string, questions: QuestionRow[]) {
  const parsed = JSON.parse(extractJson(content)) as {
    results?: Record<string, Omit<JudgeResult, "questionId" | "updatedAt">>;
  } | Record<string, Omit<JudgeResult, "questionId" | "updatedAt">>;

  const rawResults = "results" in parsed ? parsed.results : parsed;
  const judgeResults: PaperJudgeMap = {};

  if (rawResults && typeof rawResults === "object") {
    Object.entries(rawResults).forEach(([questionId, value]) => {
      if (!value || typeof value !== "object") {
        return;
      }
      const result = value as Omit<JudgeResult, "questionId" | "updatedAt">;
      judgeResults[questionId] = {
        questionId,
        totalScore: result.totalScore ?? 0,
        maxScore: result.maxScore ?? 0,
        dimensions: Array.isArray(result.dimensions) ? result.dimensions : [],
        summary: result.summary ?? "",
        confidence: result.confidence,
        updatedAt: new Date().toISOString(),
      };
    });
  }

  questions.forEach((question) => {
    if (!judgeResults[question.id]) {
      judgeResults[question.id] = {
        questionId: question.id,
        totalScore: 0,
        maxScore: Number(question.score ?? 0),
        dimensions: [],
        summary: "判卷结果缺失。",
        updatedAt: new Date().toISOString(),
      };
    }
  });

  return judgeResults;
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
      questions.forEach((question) => {
        answers[question.id] = String(sourceAnswers[question.id] ?? "");
      });
      const judgeResults: PaperJudgeMap = {};

      for (const batch of chunkItems(questions, MAX_QUESTIONS_PER_BATCH)) {
        const judgeContent = await requestChatCompletion(
          judgeConfig,
          buildPaperJudgeMessages(
            batch,
            answerKeyMap,
            answers,
            judgeConfig,
            "用户答案",
          ),
        );
        Object.assign(judgeResults, parsePaperJudgeResults(judgeContent, batch));
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

    if (payload.action === "run-provider-question") {
      const providerId = String(payload.providerId ?? "");
      const questionId = String(payload.questionId ?? "");
      if (!providerId) {
        throw new Error("providerId 不能为空。");
      }
      if (!questionId) {
        throw new Error("questionId 不能为空。");
      }
      if (!(providerId in providerLabels)) {
        throw new Error("当前仅支持 doubao 和 deepseek。");
      }

      const question = questions.find((item) => item.id === questionId);
      if (!question) {
        throw new Error("题目不存在。");
      }

      const answerConfig = await loadModelConfig(supabase, "answer", paperId, providerId);
      const judgeConfig = await loadModelConfig(supabase, "judge", paperId);
      const answerContent = await requestChatCompletion(
        answerConfig,
        buildPaperAnswerMessages([question], answerConfig),
      );
      const answers = parsePaperAnswers(answerContent, [question]);
      const judgeContent = await requestChatCompletion(
        judgeConfig,
        buildPaperJudgeMessages(
          [question],
          answerKeyMap,
          answers,
          judgeConfig,
          `${providerLabels[providerId] ?? providerId} 答案`,
        ),
      );
      const judgeResults = parsePaperJudgeResults(judgeContent, [question]);

      return new Response(
        JSON.stringify({
          respondent: providerLabels[providerId] ?? providerId,
          respondentType: "model",
          providerId,
          paperId: paper.id,
          questionId: question.id,
          answer: answers[question.id] ?? "",
          judgeResult: judgeResults[question.id],
          answeredAt: new Date().toISOString(),
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
      const answers: PaperAnswerMap = {};
      const judgeResults: PaperJudgeMap = {};

      for (const batch of chunkItems(questions, MAX_QUESTIONS_PER_BATCH)) {
        const answerContent = await requestChatCompletion(
          answerConfig,
          buildPaperAnswerMessages(batch, answerConfig),
        );
        Object.assign(answers, parsePaperAnswers(answerContent, batch));
      }

      for (const batch of chunkItems(questions, MAX_QUESTIONS_PER_BATCH)) {
        const judgeContent = await requestChatCompletion(
          judgeConfig,
          buildPaperJudgeMessages(
            batch,
            answerKeyMap,
            answers,
            judgeConfig,
            `${providerLabels[providerId] ?? providerId} 答案`,
          ),
        );
        Object.assign(judgeResults, parsePaperJudgeResults(judgeContent, batch));
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
