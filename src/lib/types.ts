export type QuestionType =
  | "single"
  | "multiple"
  | "judge"
  | "short"
  | "essay"
  | "custom";

export type ModelConfig = {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
};

export type AnswerProviderId =
  | "doubao"
  | "deepseek";

export type AnswerProviderPreset = {
  id: AnswerProviderId;
  label: string;
  config: ModelConfig | null;
};

export type QuestionItem = {
  id: string;
  title: string;
  type: QuestionType;
  prompt: string;
  score?: number;
  options?: string[];
  referenceAnswer?: string;
  scoringRubric?: string;
  tags?: string[];
  difficulty?: string;
};

export type PaperSection = {
  title: string;
  start: number;
  end: number;
};

export type PaperDefinition = {
  id: string;
  code: string;
  label: string;
  headline: string;
  description: string;
  questions: QuestionItem[];
  sections: PaperSection[];
};

export type AnswerRunResult = {
  questionId: string;
  answer: string;
  rawResponse: string;
  status: "idle" | "running" | "success" | "failed";
  latencyMs?: number;
  errorMessage?: string;
  updatedAt: string;
};

export type JudgeDimension = {
  name: string;
  score: number;
  reason: string;
};

export type JudgeResult = {
  questionId: string;
  totalScore: number;
  maxScore: number;
  dimensions: JudgeDimension[];
  summary: string;
  confidence?: number;
  updatedAt: string;
};

export type GradeRecord = {
  id: string;
  respondent: string;
  respondentType: "user" | "model";
  providerId?: AnswerProviderId;
  paperId: string;
  paperLabel: string;
  totalScore: number;
  maxScore: number;
  submittedAt: string;
  answers: Record<string, string>;
  judgeResults: Record<string, JudgeResult>;
};

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type RemoteGradePayload = Omit<GradeRecord, "id">;
