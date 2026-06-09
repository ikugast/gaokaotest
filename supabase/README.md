# Supabase 配置

就按这一套做，不分支：

1. `public.exam_papers` 和 `public.exam_questions` 只放前端可见的试卷题面。
2. `app_private.exam_answer_keys` 只放标准答案和评分标准，不给前端公开。
3. `app_private.ai_model_configs` 只放答题模型和判卷模型的非敏感配置。
4. 真正的 API Key 不进表，统一放到 Supabase Edge Functions Secrets。

## 先建表

在 Supabase SQL Editor 执行：

```sql
\i supabase/schema.sql
```

如果你是直接复制内容到控制台，就把 [schema.sql](file:///Users/bytedance/Documents/test/supabase/schema.sql) 全部贴进去执行。

## 再生成两套试卷导入 SQL

在项目根目录执行：

```bash
node scripts/generate-supabase-seed.mjs
```

这会生成：

```text
supabase/seed.sql
```

然后把 [seed.sql](file:///Users/bytedance/Documents/test/supabase/seed.sql) 贴到 Supabase SQL Editor 再执行一次。

当前状态：

- 第一卷：会把题面、标准答案、评分标准全部导入
- 第二卷：会把题面和评分标准导入；如果本地题库没有 `referenceAnswer`，对应答案字段会是 `null`

## 配置 Edge Function Secrets

在 Supabase Edge Functions Secrets 里设置：

```text
JUDGE_LLM_API_KEY=你的 DeepSeek V4 key
```

如果要启用答题按钮，对应的答题模型 key 也放在 Secrets 里。比如：

```text
DOUBAO_API_KEY=你的火山方舟 key
DEEPSEEK_API_KEY=你的 DeepSeek key
```

`schema.sql` 已经预置了 `judge` 默认配置：

- `judge`：判卷模型

## 配置答题 AI

现在首页上的按钮固定 2 个：

- `doubao`
- `deepseek`

每个按钮都需要在 `app_private.ai_model_configs` 里配置一条 `answer` 记录。

示例：配置 `Doubao API`

```sql
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
values (
  'answer',
  null,
  'doubao',
  'https://ark.cn-beijing.volces.com/api/v3',
  '你的模型ID',
  '你是高考数学答题模型。单选题只返回一个选项字母，多选题只返回全部选项字母，填空题只返回结果，解答题给出必要步骤和最终答案。',
  'DOUBAO_API_KEY',
  true
);
```

DeepSeek 同理，只替换这 4 个字段：

```sql
update app_private.ai_model_configs
set
  provider_name = 'deepseek',
  base_url = 'https://api.deepseek.com/v1',
  model_name = '你的DeepSeek模型ID',
  secret_name = 'DEEPSEEK_API_KEY'
where model_role = 'answer' and provider_name = 'deepseek' and paper_id is null;
```

如果不存在，就直接 `insert`。

现在这套配置默认不传 `temperature` 和 `max_tokens`。

- 不填 `temperature`：模型按服务端默认参数回答
- 不填 `max_tokens`：Edge Function 不做输出长度限制，实际可生成上限由模型服务端决定

## 部署 Edge Function

把这个函数部署到 Supabase：

```bash
supabase functions deploy grade-paper
```

函数文件在：

```text
supabase/functions/grade-paper/index.ts
```

## 前端环境变量

前端线上只保留这两个变量：

```text
VITE_SUPABASE_URL=你的 Supabase Project URL
VITE_SUPABASE_ANON_KEY=你的 Supabase anon key
```

模型 key 不再进入前端。

## 当前执行链路

现在网站的执行链路是：

1. 前端调用 `grade-paper`
2. Edge Function 从 Supabase 读取：
   - 题目
   - 标准答案
   - 评分标准
   - 答题模型配置
   - 判卷模型配置
3. Edge Function 用 Supabase Secrets 里的真实 API Key 调模型
4. 返回整卷答案和成绩给前端
5. 前端把结果展示在试卷页和成绩单页

## 判分 AI

当前默认已经写成：

- `answer`：答题模型，由你按按钮逐条配置


当前默认已经写成：

```sql
  provider_name = 'deepseek',
  base_url = 'https://api.deepseek.com/v1',
  model_name = 'deepseek-v4'
where model_role = 'judge' and paper_id is null;
```

你实际只需要保证 `JUDGE_LLM_API_KEY` 是 DeepSeek V4 对应的密钥。

如果你要给两张卷子单独配不同判卷模型，就把 `paper_id` 填成 `paper-1` 或 `paper-2`，各插一条即可。

## 表的职责

- `public.exam_papers`
  - 试卷元信息
- `public.exam_questions`
  - 题号、题面、分值、选项、题型
- `app_private.exam_answer_keys`
  - 标准答案、评分标准
- `app_private.ai_model_configs`
  - 答题 / 判卷模型的路由配置，不含真实密钥

## 这套配置的边界

这套配置已经够你把：

- 第一卷答案
- 第二卷答案占位
- 判分 AI
- 答题 AI

统一放进 Supabase。

但前端不能直接读取 `app_private` 里的答案和模型配置。真正阅卷时，应该由 Supabase Edge Function 用 service role 或 secrets 去读 `app_private`，再调大模型。
