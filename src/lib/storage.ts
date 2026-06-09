export const STORAGE_KEYS = {
  answerModelConfig: "ai-quiz.answer-model-config",
  judgeModelConfig: "ai-quiz.judge-model-config",
  questionBank: "ai-quiz.question-bank",
  questionBankVersion: "ai-quiz.question-bank-version",
  currentPaperId: "ai-quiz.current-paper-id",
  userAnswers: "ai-quiz.user-answers",
  answerRuns: "ai-quiz.answer-runs",
  judgeRuns: "ai-quiz.judge-runs",
  gradeRecords: "ai-quiz.grade-records",
  activeQuestionId: "ai-quiz.active-question-id",
} as const;

export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
