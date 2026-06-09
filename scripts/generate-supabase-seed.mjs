import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const rootDir = path.resolve(import.meta.dirname, "..");
const sectionRanges = [
  {
    sectionNo: 1,
    sectionTitle:
      "一、选择题：本题共8小题，每小题5分，共40分。在每小题给出的四个选项中，只有一项是符合题目要求的。",
    start: 0,
    end: 8,
  },
  {
    sectionNo: 2,
    sectionTitle:
      "二、选择题：本题共3小题，每小题6分，共18分。在每小题给出的选项中，有多项符合题目要求。全部选对的得6分，部分选对的得部分分，有选错的得0分。",
    start: 8,
    end: 11,
  },
  {
    sectionNo: 3,
    sectionTitle: "三、填空题：本题共3小题，每小题5分，共15分。",
    start: 11,
    end: 14,
  },
  {
    sectionNo: 4,
    sectionTitle: "四、解答题：本题共5小题，共77分。解答应写出文字说明、证明过程或演算步骤。",
    start: 14,
    end: 19,
  },
];

function loadQuestionArray(relativePath, exportName) {
  const filePath = path.join(rootDir, relativePath);
  let code = fs.readFileSync(filePath, "utf8");
  code = code.replace(/^import[^\n]*\n/gm, "");
  code = code.replace(
    new RegExp(`export const ${exportName}[^=]*=`, "m"),
    `globalThis.${exportName} =`,
  );
  const context = { String };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(code, context, { filename: filePath });
  return context[exportName];
}

function sqlString(value) {
  if (value === undefined || value === null) {
    return "null";
  }
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlJson(value) {
  if (value === undefined || value === null) {
    return "null";
  }
  return `${sqlString(JSON.stringify(value))}::jsonb`;
}

function getSection(index) {
  return (
    sectionRanges.find((section) => index >= section.start && index < section.end) ??
    sectionRanges[sectionRanges.length - 1]
  );
}

function questionRow(paperId, question, index) {
  const section = getSection(index);
  return `(
  ${sqlString(question.id)},
  ${sqlString(paperId)},
  ${section.sectionNo},
  ${sqlString(section.sectionTitle)},
  ${index + 1},
  ${sqlString(question.title)},
  ${sqlString(question.type)},
  ${sqlString(question.prompt)},
  ${question.score ?? 0},
  ${sqlJson(question.options ?? null)},
  ${sqlJson(question.tags ?? null)},
  ${sqlString(question.difficulty ?? null)}
)`;
}

function answerKeyRow(question) {
  return `(
  ${sqlString(question.id)},
  ${sqlString(question.referenceAnswer ?? null)},
  ${sqlString(question.scoringRubric ?? null)}
)`;
}

const paperOneQuestions = loadQuestionArray("src/lib/paperOne.ts", "paperOneQuestions");
const paperTwoQuestions = loadQuestionArray("src/lib/paperTwo.ts", "paperTwoQuestions");

const allQuestionRows = [
  ...paperOneQuestions.map((question, index) => questionRow("paper-1", question, index)),
  ...paperTwoQuestions.map((question, index) => questionRow("paper-2", question, index)),
];

const allAnswerKeyRows = [
  ...paperOneQuestions.map(answerKeyRow),
  ...paperTwoQuestions.map(answerKeyRow),
];

const sql = `begin;

insert into public.exam_questions (
  id,
  paper_id,
  section_no,
  section_title,
  question_no,
  title,
  question_type,
  prompt_latex,
  score,
  options_json,
  tags_json,
  difficulty
)
values
${allQuestionRows.join(",\n")}
on conflict (id) do update
set
  paper_id = excluded.paper_id,
  section_no = excluded.section_no,
  section_title = excluded.section_title,
  question_no = excluded.question_no,
  title = excluded.title,
  question_type = excluded.question_type,
  prompt_latex = excluded.prompt_latex,
  score = excluded.score,
  options_json = excluded.options_json,
  tags_json = excluded.tags_json,
  difficulty = excluded.difficulty,
  updated_at = now();

insert into app_private.exam_answer_keys (
  question_id,
  reference_answer,
  scoring_rubric
)
values
${allAnswerKeyRows.join(",\n")}
on conflict (question_id) do update
set
  reference_answer = excluded.reference_answer,
  scoring_rubric = excluded.scoring_rubric,
  updated_at = now();

commit;
`;

const outputPath = path.join(rootDir, "supabase", "seed.sql");
fs.writeFileSync(outputPath, sql, "utf8");
console.log(`generated ${outputPath}`);
