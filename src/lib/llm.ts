import type {
  AnswerRunResult,
  ChatMessage,
  JudgeResult,
  ModelConfig,
  QuestionItem,
} from "@/lib/types";

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

function trimBaseUrl(baseUrl: string) {
  return baseUrl.replace(/\/$/, "");
}

export async function requestChatCompletion(
  config: ModelConfig,
  messages: ChatMessage[],
) {
  const startedAt = performance.now();
  const response = await fetch(`${trimBaseUrl(config.baseUrl)}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
      messages,
    }),
  });

  const rawText = await response.text();
  if (!response.ok) {
    throw new Error(`模型调用失败：${response.status} ${rawText}`);
  }

  const data = JSON.parse(rawText) as ChatCompletionResponse;
  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("模型返回为空，无法继续处理。");
  }

  return {
    content,
    rawText,
    latencyMs: Math.round(performance.now() - startedAt),
  };
}

export function buildAnswerMessages(
  question: QuestionItem,
  config: ModelConfig,
): ChatMessage[] {
  return [
    {
      role: "system",
      content: config.systemPrompt,
    },
    {
      role: "user",
      content: [
        `题目标题：${question.title}`,
        `题目类型：${question.type}`,
        `题目内容：${question.prompt}`,
        question.options?.length
          ? `选项：${question.options.map((item, index) => `${index + 1}. ${item}`).join("\n")}`
          : "",
        question.referenceAnswer ? `参考答案：${question.referenceAnswer}` : "",
        "请直接输出最终答案，避免额外解释。",
      ]
        .filter(Boolean)
        .join("\n\n"),
    },
  ];
}

export function buildJudgeMessages(
  question: QuestionItem,
  answerResult: AnswerRunResult,
  config: ModelConfig,
): ChatMessage[] {
  return buildJudgeMessagesFromAnswerText(
    question,
    answerResult.answer,
    config,
    "AI 答案",
  );
}

export function buildJudgeMessagesFromAnswerText(
  question: QuestionItem,
  answerText: string,
  config: ModelConfig,
  answerLabel = "用户答案",
): ChatMessage[] {
  return [
    {
      role: "system",
      content: `${config.systemPrompt}

请严格输出 JSON，不要使用 Markdown 代码块。JSON 结构如下：
{
  "totalScore": 88,
  "maxScore": 5,
  "dimensions": [
    { "name": "正确性", "score": 35, "reason": "..." }
  ],
  "summary": "总体点评",
  "confidence": 0.82
}`,
    },
    {
      role: "user",
      content: [
        `题目标题：${question.title}`,
        `题目类型：${question.type}`,
        `题目满分：${question.score ?? 100}`,
        `题目内容：${question.prompt}`,
        question.referenceAnswer ? `参考答案：${question.referenceAnswer}` : "参考答案：未提供",
        question.scoringRubric
          ? `评分标准：${question.scoringRubric}`
          : `评分标准：总分 ${question.score ?? 100} 分，请按正确性、完整性、逻辑性、表达质量评分。`,
        `${answerLabel}：${answerText}`,
        `请基于以上信息完成判分，输出合法 JSON。maxScore 必须等于 ${question.score ?? 100}，totalScore 必须在 0 到 ${question.score ?? 100} 之间。`,
      ].join("\n\n"),
    },
  ];
}

export function parseJudgeResult(
  content: string,
  questionId: string,
): JudgeResult {
  const normalized = extractJson(content);
  const parsed = JSON.parse(normalized) as Omit<JudgeResult, "questionId" | "updatedAt">;

  return {
    questionId,
    totalScore: parsed.totalScore ?? 0,
    maxScore: parsed.maxScore ?? 100,
    dimensions: Array.isArray(parsed.dimensions) ? parsed.dimensions : [],
    summary: parsed.summary ?? "未提供点评",
    confidence: parsed.confidence,
    updatedAt: new Date().toISOString(),
  };
}

export function extractJson(content: string) {
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

export function normalizeImportedQuestions(input: unknown): QuestionItem[] {
  if (!Array.isArray(input)) {
    throw new Error("导入数据必须是数组。");
  }

  return input.map((item, index) => {
    const record = item as Partial<QuestionItem>;
    if (!record.title || !record.prompt) {
      throw new Error(`第 ${index + 1} 题缺少 title 或 prompt。`);
    }

    return {
      id: record.id ?? `q-${Date.now()}-${index}`,
      title: String(record.title),
      type: record.type ?? "custom",
      prompt: String(record.prompt),
      score: typeof record.score === "number" ? record.score : undefined,
      options: Array.isArray(record.options) ? record.options.map(String) : undefined,
      referenceAnswer: record.referenceAnswer
        ? String(record.referenceAnswer)
        : undefined,
      scoringRubric: record.scoringRubric ? String(record.scoringRubric) : undefined,
      tags: Array.isArray(record.tags) ? record.tags.map(String) : undefined,
      difficulty: record.difficulty ? String(record.difficulty) : undefined,
    };
  });
}
