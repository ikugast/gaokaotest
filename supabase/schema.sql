create schema if not exists app_private;

create table if not exists public.exam_papers (
  id text primary key,
  code text not null unique,
  label text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exam_questions (
  id text primary key,
  paper_id text not null references public.exam_papers(id) on delete cascade,
  section_no integer not null,
  section_title text not null,
  question_no integer not null,
  title text not null,
  question_type text not null,
  prompt_latex text not null,
  score numeric(8,2) not null default 0,
  options_json jsonb,
  tags_json jsonb,
  difficulty text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (paper_id, question_no)
);

create table if not exists app_private.exam_answer_keys (
  question_id text primary key references public.exam_questions(id) on delete cascade,
  reference_answer text,
  scoring_rubric text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists app_private.ai_model_configs (
  id uuid primary key default gen_random_uuid(),
  model_role text not null check (model_role in ('answer', 'judge')),
  paper_id text references public.exam_papers(id) on delete cascade,
  provider_name text not null,
  base_url text not null,
  model_name text not null,
  system_prompt text not null,
  secret_name text not null,
  temperature numeric(6,3),
  max_tokens integer,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (model_role, paper_id)
);

create index if not exists exam_questions_paper_idx
  on public.exam_questions (paper_id, section_no, question_no);

create index if not exists ai_model_configs_role_idx
  on app_private.ai_model_configs (model_role, paper_id, enabled);

alter table public.exam_papers enable row level security;
alter table public.exam_questions enable row level security;
alter table app_private.exam_answer_keys enable row level security;
alter table app_private.ai_model_configs enable row level security;

alter table app_private.ai_model_configs
  alter column temperature drop not null,
  alter column temperature drop default,
  alter column max_tokens drop not null,
  alter column max_tokens drop default;

drop policy if exists "public can read papers" on public.exam_papers;
create policy "public can read papers"
on public.exam_papers
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "public can read questions" on public.exam_questions;
create policy "public can read questions"
on public.exam_questions
for select
to anon, authenticated
using (true);

insert into public.exam_papers (id, code, label, sort_order, is_active)
values
  ('paper-1', '2026-paper-1', '第一卷', 1, true),
  ('paper-2', '2026-paper-2', '第二卷', 2, true)
on conflict (id) do update
set
  code = excluded.code,
  label = excluded.label,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into app_private.ai_model_configs (
  model_role,
  paper_id,
  provider_name,
  base_url,
  model_name,
  system_prompt,
  secret_name,
  enabled
)
values
  (
    'answer',
    null,
    'openai-compatible',
    'https://api.openai.com/v1',
    'gpt-4.1-mini',
    '你是高考数学答题模型。请只输出最终答案；如果是解答题，输出必要的推导步骤和最终结论，保持简洁准确。',
    'ANSWER_LLM_API_KEY',
    true
  ),
  (
    'judge',
    null,
    'deepseek',
    'https://api.deepseek.com/v1',
    'deepseek-v4',
    '你是高考数学阅卷模型。请严格依据标准答案和评分标准判分，输出结构化 JSON，分数必须落在题目满分范围内。',
    'JUDGE_LLM_API_KEY',
    true
  )
on conflict (model_role, paper_id) do update
set
  provider_name = excluded.provider_name,
  base_url = excluded.base_url,
  model_name = excluded.model_name,
  system_prompt = excluded.system_prompt,
  secret_name = excluded.secret_name,
  temperature = excluded.temperature,
  max_tokens = excluded.max_tokens,
  enabled = excluded.enabled,
  updated_at = now();
