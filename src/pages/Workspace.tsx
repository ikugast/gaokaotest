import { useMemo, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { MathText } from "@/components/MathText";
import { SectionCard } from "@/components/SectionCard";
import { builtInPapers, getPaperById } from "@/lib/papers";
import type { GradeRecord, QuestionItem } from "@/lib/types";
import { useQuizStore } from "@/store/useQuizStore";

export default function Workspace() {
  const currentPaperId = useQuizStore((state) => state.currentPaperId);
  const gradeRecords = useQuizStore((state) => state.gradeRecords);
  const setCurrentPaper = useQuizStore((state) => state.setCurrentPaper);
  const clearGradeRecords = useQuizStore((state) => state.clearGradeRecords);
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  const currentPaper = useMemo(
    () => getPaperById(currentPaperId),
    [currentPaperId],
  );
  const filteredRecords = useMemo(
    () => gradeRecords.filter((record) => record.paperId === currentPaperId),
    [gradeRecords, currentPaperId],
  );

  const normalizeSelectedOptions = (answer: string) =>
    answer
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const renderAnswer = (record: GradeRecord, question: QuestionItem) => {
    const answer = record.answers[question.id] ?? "";
    if (!answer) {
      return <p className="text-sm text-stone-400">未作答</p>;
    }

    const looksLikeChoiceAnswer =
      (question.type === "single" || question.type === "multiple") &&
      /^[A-Z](,[A-Z])*$/.test(answer);

    if (looksLikeChoiceAnswer) {
      const selected = normalizeSelectedOptions(answer);
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

  return (
    <div className="space-y-6">
      <SectionCard
        title="成绩单"
        eyebrow="Records"
        description="记录用户与各个模型的整卷成绩，点击单条记录可展开完整答题卷面。"
      >
        <div className="flex flex-wrap items-center gap-3">
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
                setExpandedRecordId(null);
              }}
            >
              {paper.label}
            </button>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-100"
            onClick={() => {
              clearGradeRecords();
              setExpandedRecordId(null);
            }}
          >
            <Trash2 className="h-4 w-4" />
            清空成绩单
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title={`${currentPaper.label} 成绩记录`}
        eyebrow="Scoreboard"
        description="展示答题者与总成绩，点击后展开完整答题卷面。"
      >
        <div className="space-y-3">
          <div className="grid grid-cols-[1.2fr_0.9fr_0.7fr_auto] gap-3 rounded-2xl bg-stone-100 px-4 py-3 text-xs uppercase tracking-[0.2em] text-stone-500">
            <span>答题者</span>
            <span>试卷</span>
            <span>成绩</span>
            <span></span>
          </div>

          {filteredRecords.length ? (
            filteredRecords.map((record) => {
              const expanded = expandedRecordId === record.id;
              const paper = getPaperById(record.paperId);
              return (
                <div
                  key={record.id}
                  className="rounded-2xl border border-stone-200 bg-stone-50"
                >
                  <button
                    type="button"
                    className="grid w-full grid-cols-[1.2fr_0.9fr_0.7fr_auto] items-center gap-3 px-4 py-4 text-left"
                    onClick={() => setExpandedRecordId(expanded ? null : record.id)}
                  >
                    <div>
                      <p className="font-medium text-stone-900">{record.respondent}</p>
                      <p className="mt-1 text-xs text-stone-500">
                        {new Date(record.submittedAt).toLocaleString("zh-CN")}
                      </p>
                    </div>
                    <p className="text-sm text-stone-600">{record.paperLabel}</p>
                    <p className="font-['Oxanium'] text-lg text-stone-900">
                      {record.totalScore}/{record.maxScore}
                    </p>
                    <ChevronDown
                      className={`h-4 w-4 text-stone-500 transition ${expanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {expanded ? (
                    <div className="border-t border-stone-200 bg-white px-4 py-5">
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">
                          {paper.label}
                        </span>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
                          总分 {record.totalScore}/{record.maxScore}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {paper.questions.map((question, index) => {
                          const judgeResult = record.judgeResults[question.id];
                          return (
                            <article
                              key={question.id}
                              className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4"
                            >
                              <div className="flex flex-wrap items-center gap-3">
                                <span className="font-['Oxanium'] text-lg text-stone-900">
                                  {index + 1}.
                                </span>
                                <span className="text-sm text-stone-500">
                                  {question.score ?? 0} 分
                                </span>
                              </div>
                              <MathText
                                text={question.prompt}
                                className="mt-3 text-sm leading-7 text-stone-800"
                              />
                              {question.options?.length ? (
                                <ol className="mt-3 space-y-1 text-sm text-stone-600">
                                  {question.options.map((option, optionIndex) => (
                                    <li key={option}>
                                      <span className="mr-1">
                                        {String.fromCharCode(65 + optionIndex)}.
                                      </span>
                                      <MathText text={option} inline />
                                    </li>
                                  ))}
                                </ol>
                              ) : null}

                              <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                                <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
                                  <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                                    答题结果
                                  </p>
                                  <div className="mt-3">{renderAnswer(record, question)}</div>
                                </div>

                                <div className="rounded-2xl border border-stone-200 bg-white px-4 py-4">
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-stone-400">
                                      本题得分
                                    </p>
                                    <p className="font-medium text-stone-900">
                                      {judgeResult
                                        ? `${judgeResult.totalScore}/${judgeResult.maxScore}`
                                        : "--"}
                                    </p>
                                  </div>
                                  {judgeResult ? (
                                    <div className="mt-3 space-y-3">
                                      {judgeResult.dimensions.map((dimension) => (
                                        <div key={dimension.name}>
                                          <div className="flex items-center justify-between gap-3 text-sm">
                                            <span className="text-stone-900">
                                              {dimension.name}
                                            </span>
                                            <span className="text-stone-500">
                                              {dimension.score}
                                            </span>
                                          </div>
                                          <MathText
                                            text={dimension.reason}
                                            className="mt-1 text-sm leading-6 text-stone-600"
                                          />
                                        </div>
                                      ))}
                                      <div className="rounded-2xl bg-stone-50 px-3 py-3">
                                        <MathText
                                          text={judgeResult.summary}
                                          className="text-sm leading-6 text-stone-600"
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="mt-3 text-sm text-stone-400">暂无判分结果</p>
                                  )}
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-300 px-4 py-10 text-center text-sm text-stone-500">
              还没有成绩记录。用户提交答卷和模型自动答题完成后，记录会出现在这里。
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}
