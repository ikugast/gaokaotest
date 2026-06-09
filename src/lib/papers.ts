import { paperOneQuestions } from "@/lib/paperOne";
import { paperTwoQuestions } from "@/lib/paperTwo";
import type { PaperDefinition } from "@/lib/types";

const defaultSections = [
  {
    title:
      "一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。",
    start: 0,
    end: 8,
  },
  {
    title:
      "二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。",
    start: 8,
    end: 11,
  },
  {
    title: "三、填空题：本题共3小题，每小题5分，共15分。",
    start: 11,
    end: 14,
  },
  {
    title: "四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。",
    start: 14,
    end: 19,
  },
];

export const builtInPapers: PaperDefinition[] = [
  {
    id: "paper-1",
    code: "2026 第一卷",
    label: "第一卷",
    headline: "数学试卷完整题目",
    description:
      "直接在卷面作答。选择题点选项，填空题和解答题在题下输入，整张卷子在底部统一提交并等待 AI 判分。",
    questions: paperOneQuestions,
    sections: defaultSections,
  },
  {
    id: "paper-2",
    code: "2026 第二卷",
    label: "第二卷",
    headline: "数学试卷完整题目",
    description:
      "可在网页中切换到第二卷并直接完成整卷作答，页面底部统一提交并等待 AI 判分。",
    questions: paperTwoQuestions,
    sections: defaultSections,
  },
];

export function getPaperById(paperId: string) {
  return builtInPapers.find((paper) => paper.id === paperId) ?? builtInPapers[0];
}

export function getDefaultPaper() {
  return builtInPapers[0];
}
