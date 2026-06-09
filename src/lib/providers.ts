import type { AnswerProviderPreset, ModelConfig } from "@/lib/types";

export const answerProviderPresets: AnswerProviderPreset[] = [
  {
    id: "doubao",
    label: "Doubao API",
    config: null,
  },
  {
    id: "deepseek",
    label: "DeepSeek API",
    config: null,
  },
];

export function createDefaultJudgeModel() {
  return {
    id: "judge",
    name: "判卷模型",
    baseUrl: "",
    apiKey: "",
    model: "",
    systemPrompt:
      "你是严格的 AI 判卷官。你必须根据参考答案与评分标准给出结构化评分结果，避免主观套话。",
    temperature: 0.1,
    maxTokens: 800,
  } satisfies ModelConfig;
}
