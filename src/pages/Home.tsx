import { useMemo, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { MathText } from "@/components/MathText";
import { answerProviderPresets } from "@/lib/providers";
import { builtInPapers, getPaperById } from "@/lib/papers";
import { invokeGradePaper } from "@/lib/supabase";
import type { AnswerProviderPreset, GradeRecord, QuestionItem, RemoteGradePayload } from "@/lib/types";
import { useQuizStore } from "@/store/useQuizStore";

export default function Home() {
  const currentPaperId = useQuizStore((state) => state.currentPaperId);
  const questions = useQuizStore((state) => state.questions);
  const userAnswers = useQuizStore((state) => state.userAnswers);
  const judgeRuns = useQuizStore((state) => state.judgeRuns);
  const setCurrentPaper = useQuizStore((state) => state.setCurrentPaper);
  const setUserAnswer = useQuizStore((state) => state.setUserAnswer);
  const setJudgeRun = useQuizStore((state) => state.setJudgeRun);
  const addGradeRecord = useQuizStore((state) => state.addGradeRecord);
  const [isCompleting, setIsCompleting] = useState(false);
  const [submissionError, setSubmissionError] = useState<Record<string, string>>({});
  const [completionMessage, setCompletionMessage] = useState("");
  const [gradingProgress, setGradingProgress] = useState(0);
  const [runningProviderId, setRunningProviderId] = useState<string | null>(null);
  const [providerProgress, setProviderProgress] = useState(0);
  const [providerMessage, setProviderMessage] = useState("");
  const [finalScore, setFinalScore] = useState<{
    totalScore: number;
    maxScore: number;
  } | null>(null);
  const currentPaper = useMemo(
    () => getPaperById(currentPaperId),
    [currentPaperId],
  );
  const modelRecords = useQuizStore((state) => state.gradeRecords);
  const latestModelRecords = useMemo(() => {
    const latest = new Map<string, GradeRecord>();
    modelRecords
      .filter(
        (record) => record.paperId === currentPaperId && record.respondentType === "model",
      )
      .forEach((record) => {
        const key = record.providerId ?? record.id;
        if (!latest.has(key)) {
          latest.set(key, record);
        }
      });

    return Array.from(latest.values());
  }, [currentPaperId, modelRecords]);

  const isTextQuestion = (type: string) => type === "short" || type === "essay";

  const getSelectedOptions = (answer: string) =>
    answer
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const formatAnswerForJudge = (questionId: string) => {
    const question = questions.find((item) => item.id === questionId);
    const answer = userAnswers[questionId]?.trim() ?? "";
    if (!question) {
      return "";
    }

    if (!answer) {
      return "";
    }

    if (question.type === "single" || question.type === "multiple") {
      const selected = getSelectedOptions(answer);
      const details = selected
        .map((label) => {
          const option = question.options?.[label.charCodeAt(0) - 65];
          return option ? `${label}. ${option}` : label;
        })
        .join("\n");
      return [`选择结果：${selected.join(", ")}`, details ? `对应选项：\n${details}` : ""]
        .filter(Boolean)
        .join("\n\n");
    }

    return answer;
  };

  const renderStoredAnswer = (question: QuestionItem, answer: string) => {
    if (!answer) {
      return <p className="text-sm text-stone-400">未返回答案</p>;
    }

    const looksLikeChoiceAnswer =
      (question.type === "single" || question.type === "multiple") &&
      /^[A-Z](,[A-Z])*$/.test(answer);

    if (looksLikeChoiceAnswer) {
      const selected = getSelectedOptions(answer);
      return (
        <div className="space-y-2">
          <p className="text-sm font-medium text-stone-900">{selected.join(", ")}</p>
          <ul className="space-y-1 text-sm text-stone-600">
            {selected.map((label) => {
              const option = question.options?.[label.charCodeAt(0) - 65];
              return option ? (
                <li key={label}>
                  <span className="mr-1">{label}.</span>
                  <MathText text={option} inline />
                </li>
              ) : null;
            })}
          </ul>
        </div>
      );
    }

    return <MathText text={answer} className="text-sm leading-7 text-stone-700" />;
  };

  const writeJudgeRuns = (record: RemoteGradePayload) => {
    Object.values(record.judgeResults).forEach((result) => {
      setJudgeRun(result);
    });
  };

  const persistRecord = (record: RemoteGradePayload) => {
    writeJudgeRuns(record);
    addGradeRecord({
      ...record,
      id: `${record.respondentType}-${record.providerId ?? "user"}-${Date.now()}`,
    });
  };

  const runProviderPaper = async (provider: AnswerProviderPreset) => {
    setRunningProviderId(provider.id);
    setProviderProgress(0);
    setProviderMessage("");

    try {
      setProviderProgress(15);
      const record = await invokeGradePaper({
        action: "run-provider-paper",
        paperId: currentPaper.id,
        providerId: provider.id,
      });
      setProviderProgress(100);
      persistRecord(record);
      setProviderMessage(`${provider.label} 已完成自动答题和判卷。`);
    } catch (error) {
      setProviderMessage(
        error instanceof Error ? error.message : `${provider.label} 执行失败。`,
      );
    } finally {
      setRunningProviderId(null);
      setProviderProgress(0);
    }
  };

  const handleSelectOption = (questionId: string, label: string, multiple = false) => {
    const current = getSelectedOptions(userAnswers[questionId] ?? "");
    if (!multiple) {
      setUserAnswer(questionId, label);
      return;
    }

    const next = current.includes(label)
      ? current.filter((item) => item !== label)
      : [...current, label].sort();
    setUserAnswer(questionId, next.join(","));
  };

  const handleCompletePaper = async () => {
    const missingQuestionIds = questions
      .filter((question) => !formatAnswerForJudge(question.id))
      .map((question) => question.id);

    if (missingQuestionIds.length) {
      const nextErrors = { ...submissionError };
      missingQuestionIds.forEach((id) => {
        nextErrors[id] = "该题尚未作答，无法完成答卷。";
      });
      setSubmissionError(nextErrors);
      setCompletionMessage(`还有 ${missingQuestionIds.length} 题未作答。`);
      return;
    }

    setIsCompleting(true);
    setCompletionMessage("");
    setFinalScore(null);
    setGradingProgress(0);
    try {
      setGradingProgress(15);
      const record = await invokeGradePaper({
        action: "grade-user-paper",
        paperId: currentPaper.id,
        answers: questions.reduce<Record<string, string>>((accumulator, question) => {
          accumulator[question.id] = userAnswers[question.id] ?? "";
          return accumulator;
        }, {}),
      });
      setGradingProgress(100);
      persistRecord(record);
      setFinalScore({ totalScore: record.totalScore, maxScore: record.maxScore });
      setCompletionMessage("");
      setSubmissionError({});
    } catch (error) {
      setCompletionMessage(error instanceof Error ? error.message : "提交失败。");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div>
      <section className="rounded-[24px] border border-stone-200 bg-white px-6 py-8 shadow-sm md:px-10">
        <div className="mb-8 space-y-4 border-b border-stone-200 pb-6">
          <div className="flex flex-wrap gap-2">
            {builtInPapers.map((paper) => (
              <button
                key={paper.id}
                type="button"
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  paper.id === currentPaperId
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-300 bg-white text-stone-600 hover:border-stone-500"
                }`}
                onClick={() => {
                  setCurrentPaper(paper.id);
                  setCompletionMessage("");
                  setSubmissionError({});
                  setProviderMessage("");
                }}
              >
                {paper.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {answerProviderPresets.map((provider) => {
                const isRunning = runningProviderId === provider.id;
                return (
                  <button
                    key={provider.id}
                    type="button"
                    disabled={Boolean(runningProviderId) || isCompleting}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                      "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
                    } disabled:cursor-not-allowed disabled:opacity-60`}
                    onClick={() => runProviderPaper(provider)}
                  >
                    {isRunning ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : null}
                    {provider.label}
                  </button>
                );
              })}
            </div>

            {runningProviderId ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>
                    {
                      answerProviderPresets.find((item) => item.id === runningProviderId)
                        ?.label
                    }{" "}
                    正在自动答题
                  </span>
                  <span>{providerProgress}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className="h-full rounded-full bg-stone-900 transition-all duration-300"
                    style={{ width: `${providerProgress}%` }}
                  />
                </div>
              </div>
            ) : null}

            {providerMessage ? (
              <p className="text-sm text-stone-500">{providerMessage}</p>
            ) : null}
          </div>
        </div>

        <div className="space-y-10">
          {currentPaper.sections.map((section) => {
            const sectionQuestions = questions.slice(section.start, section.end);
            if (!sectionQuestions.length) {
              return null;
            }

            return (
              <section key={section.title} className="space-y-6">
                <div className="border-l-4 border-stone-900 pl-4 text-lg font-semibold leading-8 text-stone-900">
                  <MathText text={section.title} />
                </div>

                <div className="space-y-6">
                  {sectionQuestions.map((question, index) => {
                    const questionNumber = section.start + index + 1;
                    return (
                      <article
                        key={question.id}
                        className="rounded-2xl border border-stone-200 bg-stone-50/70 px-5 py-5"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-['Oxanium'] text-lg text-stone-900">
                            {questionNumber}.
                          </span>
                          <span className="rounded-full bg-stone-200 px-3 py-1 text-xs text-stone-600">
                            {question.type}
                          </span>
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                            {question.score ?? 0} 分
                          </span>
                        </div>

                        <MathText
                          text={question.prompt}
                          className="mt-4 text-[15px] text-stone-800"
                        />

                        <div className="mt-6 rounded-2xl border border-stone-200 bg-white px-4 py-4">
                          <p className="text-sm font-medium text-stone-900">
                            {question.type === "single"
                              ? "选择答案"
                              : question.type === "multiple"
                                ? "选择答案（可多选）"
                                : "在此作答"}
                          </p>

                          {question.type === "single" || question.type === "multiple" ? (
                            <div className="mt-4 grid gap-3">
                              {question.options?.map((option, optionIndex) => {
                                const label = String.fromCharCode(65 + optionIndex);
                                const selected = getSelectedOptions(
                                  userAnswers[question.id] ?? "",
                                ).includes(label);
                                return (
                                  <button
                                    key={label}
                                    type="button"
                                    className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                                      selected
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-stone-200 bg-stone-50 hover:bg-white"
                                    }`}
                                    onClick={() =>
                                      handleSelectOption(
                                        question.id,
                                        label,
                                        question.type === "multiple",
                                      )
                                    }
                                  >
                                    <span
                                      className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs ${
                                        selected
                                          ? "border-blue-500 bg-blue-500 text-white"
                                          : "border-stone-300 text-stone-500"
                                      }`}
                                    >
                                      {selected && question.type === "multiple" ? "✓" : label}
                                    </span>
                                    <span className="flex-1 text-sm text-stone-800">
                                      <MathText text={option} inline />
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <textarea
                              className={`mt-4 w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-400 focus:bg-white ${
                                isTextQuestion(question.type) ? "min-h-36" : "min-h-28"
                              }`}
                              placeholder={
                                question.type === "short"
                                  ? "请输入填空答案"
                                  : "请输入解题过程和最终答案"
                              }
                              value={userAnswers[question.id] ?? ""}
                              onChange={(event) =>
                                setUserAnswer(question.id, event.target.value)
                              }
                            />
                          )}

                          {submissionError[question.id] ? (
                            <p className="mt-3 text-sm text-rose-600">
                              {submissionError[question.id]}
                            </p>
                          ) : null}

                          {judgeRuns[question.id] ? (
                            <div className="mt-4 rounded-2xl bg-stone-50 px-4 py-4">
                              <div className="flex items-end gap-2">
                                <span className="font-['Oxanium'] text-3xl text-stone-900">
                                  {judgeRuns[question.id]?.totalScore}
                                </span>
                                <span className="pb-1 text-sm text-stone-500">
                                  / {judgeRuns[question.id]?.maxScore}
                                </span>
                              </div>
                              <div className="mt-4 space-y-3">
                                {judgeRuns[question.id]?.dimensions.map((dimension) => (
                                  <div
                                    key={dimension.name}
                                    className="rounded-2xl border border-stone-200 bg-white px-4 py-4"
                                  >
                                    <div className="flex items-center justify-between gap-3">
                                      <span className="font-medium text-stone-900">
                                        {dimension.name}
                                      </span>
                                      <span className="text-stone-500">
                                        {dimension.score}
                                      </span>
                                    </div>
                                    <MathText
                                      text={dimension.reason}
                                      className="mt-2 text-stone-600"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-stone-600">
                                <MathText text={judgeRuns[question.id]?.summary ?? ""} />
                              </div>
                            </div>
                          ) : null}

                          {latestModelRecords.length ? (
                            <div className="mt-4 space-y-3">
                              {latestModelRecords.map((record) => {
                                const judgeResult = record.judgeResults[question.id];
                                return (
                                  <div
                                    key={`${record.id}-${question.id}`}
                                    className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4"
                                  >
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                      <span className="rounded-full bg-white px-3 py-1 text-xs text-stone-600">
                                        {record.respondent}
                                      </span>
                                      <span className="text-sm text-stone-500">
                                        {judgeResult
                                          ? `${judgeResult.totalScore}/${judgeResult.maxScore}`
                                          : "--"}
                                      </span>
                                    </div>
                                    <div className="mt-3">
                                      {renderStoredAnswer(
                                        question,
                                        record.answers[question.id] ?? "",
                                      )}
                                    </div>
                                    {judgeResult ? (
                                      <div className="mt-3 rounded-2xl bg-white px-4 py-3">
                                        <MathText
                                          text={judgeResult.summary}
                                          className="text-sm leading-6 text-stone-600"
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                );
                              })}
                            </div>
                          ) : null}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-10 rounded-[24px] border border-stone-200 bg-stone-50 px-6 py-6">
          <div className="mx-auto max-w-xl">
            {isCompleting ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-stone-600">
                  <span>正在阅卷</span>
                  <span>{gradingProgress}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-stone-200">
                  <div
                    className="h-full rounded-full bg-stone-900 transition-all duration-300"
                    style={{ width: `${gradingProgress}%` }}
                  />
                </div>
              </div>
            ) : finalScore ? (
              <div className="text-center">
                <p className="text-sm text-stone-500">阅卷完成</p>
                <p className="mt-2 font-['Oxanium'] text-4xl text-stone-900">
                  {finalScore.totalScore}
                  <span className="ml-2 text-lg text-stone-500">
                    / {finalScore.maxScore}
                  </span>
                </p>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 bg-stone-900 px-6 py-3 text-sm text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isCompleting}
                  onClick={handleCompletePaper}
                >
                  提交答卷
                </button>
              </div>
            )}
            {completionMessage ? (
              <p className="mt-4 text-center text-sm text-stone-500">
                {completionMessage}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
