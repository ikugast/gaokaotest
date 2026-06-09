import { JudgeResultsSection } from "@/components/JudgeResultsSection";
import { useQuizStore } from "@/store/useQuizStore";

function downloadJson(filename: string, payload: unknown) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function Results() {
  const questions = useQuizStore((state) => state.questions);
  const answerRuns = useQuizStore((state) => state.answerRuns);
  const judgeRuns = useQuizStore((state) => state.judgeRuns);

  return (
    <JudgeResultsSection
      questions={questions}
      judgeRuns={judgeRuns}
      onExportJson={() =>
        downloadJson("ai-quiz-results.json", {
          exportedAt: new Date().toISOString(),
          questions,
          answerRuns,
          judgeRuns,
        })
      }
    />
  );
}
