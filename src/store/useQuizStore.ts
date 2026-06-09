import { create } from "zustand";
import { createDefaultJudgeModel } from "@/lib/providers";
import { builtInPapers, getDefaultPaper, getPaperById } from "@/lib/papers";
import { STORAGE_KEYS, readStorage, writeStorage } from "@/lib/storage";
import type {
  AnswerRunResult,
  GradeRecord,
  JudgeResult,
  ModelConfig,
  QuestionItem,
} from "@/lib/types";

type QuizState = {
  answerModel: ModelConfig;
  judgeModel: ModelConfig;
  currentPaperId: string;
  questions: QuestionItem[];
  userAnswers: Record<string, string>;
  answerRuns: Record<string, AnswerRunResult>;
  judgeRuns: Record<string, JudgeResult>;
  gradeRecords: GradeRecord[];
  activeQuestionId: string | null;
  setAnswerModel: (config: ModelConfig) => void;
  setJudgeModel: (config: ModelConfig) => void;
  setCurrentPaper: (paperId: string) => void;
  setQuestions: (questions: QuestionItem[]) => void;
  addQuestion: (question: QuestionItem) => void;
  removeQuestion: (questionId: string) => void;
  setActiveQuestion: (questionId: string) => void;
  setUserAnswer: (questionId: string, answer: string) => void;
  setAnswerRun: (result: AnswerRunResult) => void;
  setJudgeRun: (result: JudgeResult) => void;
  addGradeRecord: (record: GradeRecord) => void;
  clearGradeRecords: () => void;
  clearRuns: () => void;
};

const DEFAULT_QUESTION_BANK_VERSION = "built-in-papers-v1";

function createDefaultModel(kind: "answer" | "judge"): ModelConfig {
  if (kind === "judge") {
    return createDefaultJudgeModel();
  }

  return {
    id: kind,
    name: "答题模型",
    baseUrl: "https://api.openai.com/v1",
    apiKey: "",
    model: "gpt-4.1-mini",
    systemPrompt:
      "你是自动答题助手。请严格根据题目作答，如果题目要求结构化输出，就直接给最终答案，不要额外寒暄。",
    temperature: 0.3,
    maxTokens: 1200,
  };
}

function hydrateModelConfig(kind: "answer" | "judge", storageKey: string) {
  const defaults = createDefaultModel(kind);
  const stored = readStorage<Partial<ModelConfig> | null>(storageKey, null);

  if (!stored) {
    return defaults;
  }

  return {
    ...defaults,
    ...stored,
    apiKey: stored.apiKey?.trim() ? stored.apiKey : defaults.apiKey,
    baseUrl: stored.baseUrl?.trim() ? stored.baseUrl : defaults.baseUrl,
    model: stored.model?.trim() ? stored.model : defaults.model,
  };
}

function defaultQuestionIds() {
  return new Set(builtInPapers.flatMap((paper) => paper.questions.map((item) => item.id)));
}

function isBuiltInPaperSet(questions: QuestionItem[]) {
  const ids = defaultQuestionIds();
  return questions.every((question) => ids.has(question.id));
}

function writeDefaultQuestionBank(paperId: string) {
  const defaults = getPaperById(paperId).questions;
  writeStorage(STORAGE_KEYS.questionBank, defaults);
  writeStorage(STORAGE_KEYS.questionBankVersion, DEFAULT_QUESTION_BANK_VERSION);
  writeStorage(STORAGE_KEYS.currentPaperId, paperId);
  return defaults;
}

function loadInitialPaperId() {
  return readStorage<string>(STORAGE_KEYS.currentPaperId, getDefaultPaper().id);
}

function loadInitialQuestions(paperId: string) {
  const stored = readStorage<QuestionItem[]>(STORAGE_KEYS.questionBank, []);
  const storedVersion = readStorage<string | null>(
    STORAGE_KEYS.questionBankVersion,
    null,
  );

  if (!stored.length) {
    return writeDefaultQuestionBank(paperId);
  }

  if (stored.length === 1 && stored[0]?.id === "demo-1") {
    return writeDefaultQuestionBank(paperId);
  }

  const paperQuestionIds = new Set(getPaperById(paperId).questions.map((item) => item.id));
  const samePaper = stored.every((question) => paperQuestionIds.has(question.id));

  if (!samePaper || (isBuiltInPaperSet(stored) && storedVersion !== DEFAULT_QUESTION_BANK_VERSION)) {
    return writeDefaultQuestionBank(paperId);
  }

  return stored;
}

const initialPaperId = loadInitialPaperId();
const initialQuestions = loadInitialQuestions(initialPaperId);

const initialActiveQuestionId = readStorage<string | null>(
  STORAGE_KEYS.activeQuestionId,
  initialQuestions[0]?.id ?? null,
);

export const useQuizStore = create<QuizState>((set, get) => ({
  answerModel: hydrateModelConfig(
    "answer",
    STORAGE_KEYS.answerModelConfig,
  ),
  judgeModel: hydrateModelConfig(
    "judge",
    STORAGE_KEYS.judgeModelConfig,
  ),
  currentPaperId: initialPaperId,
  questions: initialQuestions,
  userAnswers: readStorage<Record<string, string>>(STORAGE_KEYS.userAnswers, {}),
  answerRuns: readStorage<Record<string, AnswerRunResult>>(
    STORAGE_KEYS.answerRuns,
    {},
  ),
  judgeRuns: readStorage<Record<string, JudgeResult>>(STORAGE_KEYS.judgeRuns, {}),
  gradeRecords: readStorage<GradeRecord[]>(STORAGE_KEYS.gradeRecords, []),
  activeQuestionId: initialActiveQuestionId,
  setAnswerModel: (config) => {
    writeStorage(STORAGE_KEYS.answerModelConfig, config);
    set({ answerModel: config });
  },
  setJudgeModel: (config) => {
    writeStorage(STORAGE_KEYS.judgeModelConfig, config);
    set({ judgeModel: config });
  },
  setCurrentPaper: (paperId) => {
    const paper = getPaperById(paperId);
    writeStorage(STORAGE_KEYS.currentPaperId, paper.id);
    writeStorage(STORAGE_KEYS.questionBank, paper.questions);
    writeStorage(STORAGE_KEYS.questionBankVersion, DEFAULT_QUESTION_BANK_VERSION);
    const nextActiveId = paper.questions[0]?.id ?? null;
    writeStorage(STORAGE_KEYS.activeQuestionId, nextActiveId);
    set({
      currentPaperId: paper.id,
      questions: paper.questions,
      activeQuestionId: nextActiveId,
    });
  },
  setQuestions: (questions) => {
    writeStorage(STORAGE_KEYS.questionBank, questions);
    writeStorage(
      STORAGE_KEYS.questionBankVersion,
      isBuiltInPaperSet(questions) ? DEFAULT_QUESTION_BANK_VERSION : "custom",
    );
    const nextActiveId = questions[0]?.id ?? null;
    writeStorage(STORAGE_KEYS.activeQuestionId, nextActiveId);
    set({ questions, activeQuestionId: nextActiveId });
  },
  addQuestion: (question) => {
    const nextQuestions = [question, ...get().questions];
    writeStorage(STORAGE_KEYS.questionBank, nextQuestions);
    writeStorage(STORAGE_KEYS.questionBankVersion, "custom");
    writeStorage(STORAGE_KEYS.activeQuestionId, question.id);
    set({ questions: nextQuestions, activeQuestionId: question.id });
  },
  removeQuestion: (questionId) => {
    const nextQuestions = get().questions.filter((item) => item.id !== questionId);
    const nextActiveId =
      get().activeQuestionId === questionId
        ? (nextQuestions[0]?.id ?? null)
        : get().activeQuestionId;
    writeStorage(STORAGE_KEYS.questionBank, nextQuestions);
    writeStorage(
      STORAGE_KEYS.questionBankVersion,
      isBuiltInPaperSet(nextQuestions) ? DEFAULT_QUESTION_BANK_VERSION : "custom",
    );
    writeStorage(STORAGE_KEYS.activeQuestionId, nextActiveId);
    set({ questions: nextQuestions, activeQuestionId: nextActiveId });
  },
  setActiveQuestion: (questionId) => {
    writeStorage(STORAGE_KEYS.activeQuestionId, questionId);
    set({ activeQuestionId: questionId });
  },
  setUserAnswer: (questionId, answer) => {
    const next = { ...get().userAnswers, [questionId]: answer };
    writeStorage(STORAGE_KEYS.userAnswers, next);
    set({ userAnswers: next });
  },
  setAnswerRun: (result) => {
    const next = { ...get().answerRuns, [result.questionId]: result };
    writeStorage(STORAGE_KEYS.answerRuns, next);
    set({ answerRuns: next });
  },
  setJudgeRun: (result) => {
    const next = { ...get().judgeRuns, [result.questionId]: result };
    writeStorage(STORAGE_KEYS.judgeRuns, next);
    set({ judgeRuns: next });
  },
  addGradeRecord: (record) => {
    const next = [record, ...get().gradeRecords];
    writeStorage(STORAGE_KEYS.gradeRecords, next);
    set({ gradeRecords: next });
  },
  clearGradeRecords: () => {
    writeStorage(STORAGE_KEYS.gradeRecords, []);
    set({ gradeRecords: [] });
  },
  clearRuns: () => {
    writeStorage(STORAGE_KEYS.answerRuns, {});
    writeStorage(STORAGE_KEYS.judgeRuns, {});
    set({ answerRuns: {}, judgeRuns: {} });
  },
}));
