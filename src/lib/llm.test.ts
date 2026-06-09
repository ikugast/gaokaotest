import { describe, expect, it } from "vitest";
import {
  buildJudgeMessages,
  extractJson,
  normalizeImportedQuestions,
  parseJudgeResult,
} from "@/lib/llm";
import type { AnswerRunResult, ModelConfig, QuestionItem } from "@/lib/types";

const question: QuestionItem = {
  id: "q-1",
  title: "测试题",
  type: "essay",
  prompt: "请写一段总结。",
  referenceAnswer: "需要覆盖核心观点。",
  scoringRubric: "正确性 60，完整性 40。",
};

const answerRun: AnswerRunResult = {
  questionId: "q-1",
  answer: "这是一个覆盖核心观点的答案。",
  rawResponse: "{}",
  status: "success",
  updatedAt: new Date().toISOString(),
};

const config: ModelConfig = {
  id: "judge",
  name: "判分模型",
  baseUrl: "https://api.openai.com/v1",
  apiKey: "test",
  model: "gpt-4.1",
  systemPrompt: "你是裁判。",
  temperature: 0.1,
  maxTokens: 600,
};

describe("llm helpers", () => {
  it("能从 markdown 代码块里提取 JSON", () => {
    const content = '```json\n{"totalScore":95}\n```';
    expect(extractJson(content)).toBe('{"totalScore":95}');
  });

  it("能把判分结果解析为结构化对象", () => {
    const result = parseJudgeResult(
      '{"totalScore":92,"maxScore":100,"dimensions":[{"name":"正确性","score":55,"reason":"核心准确"}],"summary":"整体较好","confidence":0.88}',
      "q-1",
    );

    expect(result.questionId).toBe("q-1");
    expect(result.totalScore).toBe(92);
    expect(result.dimensions[0]?.name).toBe("正确性");
  });

  it("能规范化导入题目", () => {
    const items = normalizeImportedQuestions([
      { title: "题 1", prompt: "内容 1", type: "short" },
    ]);

    expect(items).toHaveLength(1);
    expect(items[0]?.title).toBe("题 1");
    expect(items[0]?.id).toMatch(/^q-/);
  });

  it("会为判分请求拼接参考答案和 AI 答案", () => {
    const messages = buildJudgeMessages(question, answerRun, config);

    expect(messages[1]?.content).toContain("参考答案：需要覆盖核心观点。");
    expect(messages[1]?.content).toContain("AI 答案：这是一个覆盖核心观点的答案。");
  });
});
