import { Download, Gauge, Layers3 } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import type { JudgeResult, QuestionItem } from "@/lib/types";

type JudgeResultsSectionProps = {
  questions: QuestionItem[];
  judgeRuns: Record<string, JudgeResult>;
  onExportJson: () => void;
};

export function JudgeResultsSection({
  questions,
  judgeRuns,
  onExportJson,
}: JudgeResultsSectionProps) {
  const results = questions
    .map((question) => ({
      question,
      judge: judgeRuns[question.id],
    }))
    .filter((item) => item.judge);

  const averageScore = results.length
    ? Math.round(
        results.reduce((sum, item) => sum + (item.judge?.totalScore ?? 0), 0) /
          results.length,
      )
    : 0;

  return (
    <SectionCard
      title="判分结果总览"
      eyebrow="Results"
      description="这里汇总所有已经完成的判分结果，方便你快速比较模型效果。"
    >
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
            <Layers3 className="h-4 w-4 text-cyan-300" />
            已判分题目
          </p>
          <p className="mt-3 font-['Oxanium'] text-4xl text-zinc-100">
            {results.length}
          </p>
        </div>
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
            <Gauge className="h-4 w-4 text-cyan-300" />
            平均分
          </p>
          <p className="mt-3 font-['Oxanium'] text-4xl text-zinc-100">
            {averageScore}
          </p>
        </div>
        <button
          type="button"
          className="rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-5 text-left transition hover:border-cyan-200 hover:bg-cyan-300/15"
          onClick={onExportJson}
        >
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-100">
            <Download className="h-4 w-4" />
            导出结果
          </p>
          <p className="mt-3 text-sm leading-7 text-cyan-50/90">
            将题目、分数、维度点评和总结导出为 JSON。
          </p>
        </button>
      </div>

      <div className="space-y-4">
        {results.length ? (
          results.map(({ question, judge }) => (
            <article
              key={question.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                    {question.type}
                  </p>
                  <h3 className="mt-2 font-['Oxanium'] text-xl text-zinc-100">
                    {question.title}
                  </h3>
                </div>
                <div className="rounded-full border border-cyan-300/40 px-4 py-2 font-['Oxanium'] text-lg text-cyan-100">
                  {judge?.totalScore}/{judge?.maxScore}
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-300">
                {judge?.summary}
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {judge?.dimensions.map((dimension) => (
                  <div
                    key={dimension.name}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-zinc-100">
                        {dimension.name}
                      </span>
                      <span className="text-sm text-cyan-200">{dimension.score}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {dimension.reason}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-zinc-700 p-10 text-center text-sm text-zinc-400">
            还没有判分结果。先到工作台执行自动答题。
          </div>
        )}
      </div>
    </SectionCard>
  );
}
