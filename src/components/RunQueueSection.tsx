import { LoaderCircle, Play, ScanSearch, Sparkles } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import type { AnswerRunResult, JudgeResult, QuestionItem } from "@/lib/types";

type RunQueueSectionProps = {
  question: QuestionItem | null;
  answerRun?: AnswerRunResult;
  judgeRun?: JudgeResult;
  isRunning: boolean;
  onRunSingle: () => void;
  onRunAll: () => void;
  onClear: () => void;
};

export function RunQueueSection({
  question,
  answerRun,
  judgeRun,
  isRunning,
  onRunSingle,
  onRunAll,
  onClear,
}: RunQueueSectionProps) {
  return (
    <SectionCard
      title="自动答题与判分"
      eyebrow="Execution"
      description="当前题目会先走答题模型，再把答案交给判分模型生成结构化评分。"
    >
      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              当前选中题目
            </p>
            {question ? (
              <>
                <h3 className="mt-3 font-['Oxanium'] text-xl text-zinc-100">
                  {question.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {question.prompt}
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm text-zinc-400">暂无题目，请先导入题库。</p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!question || isRunning}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-300/10 px-5 py-3 text-sm text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={onRunSingle}
            >
              {isRunning ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              自动答题并判分
            </button>
            <button
              type="button"
              disabled={isRunning}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-200 transition hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={onRunAll}
            >
              <Sparkles className="h-4 w-4" />
              批量跑全题库
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 px-5 py-3 text-sm text-zinc-200 transition hover:border-amber-300/40 hover:text-amber-100"
              onClick={onClear}
            >
              <ScanSearch className="h-4 w-4" />
              清空运行结果
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              答题模型输出
            </p>
            <p className="mt-3 text-xs text-zinc-500">
              状态：{answerRun?.status ?? "idle"}
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-zinc-200">
              {answerRun?.answer ?? "运行后显示 AI 自动生成的答案。"}
            </p>
            {answerRun?.errorMessage ? (
              <p className="mt-3 text-sm text-rose-300">{answerRun.errorMessage}</p>
            ) : null}
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              判分模型输出
            </p>
            {judgeRun ? (
              <>
                <div className="mt-3 flex items-end gap-2">
                  <span className="font-['Oxanium'] text-4xl text-cyan-200">
                    {judgeRun.totalScore}
                  </span>
                  <span className="pb-1 text-sm text-zinc-500">
                    / {judgeRun.maxScore}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-300">
                  {judgeRun.summary}
                </p>
              </>
            ) : (
              <p className="mt-4 text-sm leading-7 text-zinc-400">
                运行后显示结构化评分、分项扣分原因和总评。
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
