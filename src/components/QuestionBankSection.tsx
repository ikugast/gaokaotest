import { useMemo, useState } from "react";
import { FileJson, Plus, Trash2 } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { normalizeImportedQuestions } from "@/lib/llm";
import type { QuestionItem, QuestionType } from "@/lib/types";

type QuestionBankSectionProps = {
  questions: QuestionItem[];
  activeQuestionId: string | null;
  onSelect: (questionId: string) => void;
  onAdd: (question: QuestionItem) => void;
  onImport: (questions: QuestionItem[]) => void;
  onRemove: (questionId: string) => void;
};

const inputClassName =
  "w-full rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-300/60";

const questionTypes: QuestionType[] = [
  "single",
  "multiple",
  "judge",
  "short",
  "essay",
  "custom",
];

export function QuestionBankSection({
  questions,
  activeQuestionId,
  onSelect,
  onAdd,
  onImport,
  onRemove,
}: QuestionBankSectionProps) {
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [referenceAnswer, setReferenceAnswer] = useState("");
  const [scoringRubric, setScoringRubric] = useState("");
  const [type, setType] = useState<QuestionType>("custom");
  const [importText, setImportText] = useState("");
  const [feedback, setFeedback] = useState("支持手动录题，也支持直接粘贴 JSON 数组批量导入。");

  const importTemplate = useMemo(
    () =>
      JSON.stringify(
        [
          {
            title: "示例题",
            type: "short",
            prompt: "请解释你的题目内容",
            referenceAnswer: "参考答案",
            scoringRubric: "总分 100，正确性 60，完整性 40",
          },
        ],
        null,
        2,
      ),
    [],
  );

  const handleAdd = () => {
    if (!title.trim() || !prompt.trim()) {
      setFeedback("题目标题和题干不能为空。");
      return;
    }

    onAdd({
      id: `q-${Date.now()}`,
      title: title.trim(),
      type,
      prompt: prompt.trim(),
      referenceAnswer: referenceAnswer.trim() || undefined,
      scoringRubric: scoringRubric.trim() || undefined,
    });

    setTitle("");
    setPrompt("");
    setReferenceAnswer("");
    setScoringRubric("");
    setFeedback("题目已加入题库。");
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      const normalized = normalizeImportedQuestions(parsed);
      onImport(normalized);
      setFeedback(`已导入 ${normalized.length} 道题。`);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "导入失败。");
    }
  };

  return (
    <SectionCard
      title="题目与题库"
      eyebrow="Question Bank"
      description="当前先用本地题库承载。你后续把正式题目给我，直接替换这里的 JSON 即可。"
    >
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              className={inputClassName}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="题目标题"
            />
            <select
              className={inputClassName}
              value={type}
              onChange={(event) => setType(event.target.value as QuestionType)}
            >
              {questionTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className={`${inputClassName} min-h-28 resize-y`}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="题目内容"
          />
          <textarea
            className={`${inputClassName} min-h-24 resize-y`}
            value={referenceAnswer}
            onChange={(event) => setReferenceAnswer(event.target.value)}
            placeholder="参考答案，可选"
          />
          <textarea
            className={`${inputClassName} min-h-24 resize-y`}
            value={scoringRubric}
            onChange={(event) => setScoringRubric(event.target.value)}
            placeholder="评分标准，可选"
          />
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" />
            加入题库
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm text-zinc-300">
              <FileJson className="h-4 w-4 text-cyan-300" />
              批量 JSON 导入
            </div>
            <textarea
              className={`${inputClassName} min-h-48 resize-y text-xs leading-6`}
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
              placeholder={importTemplate}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
                onClick={() => setImportText(importTemplate)}
              >
                填入模板
              </button>
              <button
                type="button"
                className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/15"
                onClick={handleImport}
              >
                替换导入
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-4">
            <p className="text-sm text-zinc-400">{feedback}</p>
          </div>

          <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
            {questions.map((question) => {
              const active = question.id === activeQuestionId;
              return (
                <div
                  key={question.id}
                  role="button"
                  tabIndex={0}
                  className={`block w-full rounded-3xl border p-4 text-left transition ${
                    active
                      ? "border-cyan-300/60 bg-cyan-300/10"
                      : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
                  }`}
                  onClick={() => onSelect(question.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(question.id);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                        {question.type}
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-zinc-100">
                        {question.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm text-zinc-400">
                        {question.prompt}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="rounded-full border border-zinc-700 p-2 text-zinc-400 hover:border-rose-300/40 hover:text-rose-200"
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemove(question.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
