import { BrainCircuit, KeyRound, Link2, SlidersHorizontal } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import type { ModelConfig } from "@/lib/types";

type ModelConfigSectionProps = {
  title: string;
  eyebrow: string;
  description: string;
  config: ModelConfig;
  onChange: (config: ModelConfig) => void;
};

const fieldClassName =
  "w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-400 focus:bg-white";

export function ModelConfigSection({
  title,
  eyebrow,
  description,
  config,
  onChange,
}: ModelConfigSectionProps) {
  const updateField = <K extends keyof ModelConfig>(key: K, value: ModelConfig[K]) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <SectionCard title={title} eyebrow={eyebrow} description={description}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            <BrainCircuit className="h-4 w-4" />
            模型名称
          </span>
          <input
            className={fieldClassName}
            value={config.model}
            onChange={(event) => updateField("model", event.target.value)}
            placeholder="gpt-4.1-mini"
          />
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            <Link2 className="h-4 w-4" />
            Base URL
          </span>
          <input
            className={fieldClassName}
            value={config.baseUrl}
            onChange={(event) => updateField("baseUrl", event.target.value)}
            placeholder="https://api.openai.com/v1"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            <KeyRound className="h-4 w-4" />
            API Key
          </span>
          <input
            className={fieldClassName}
            type="password"
            value={config.apiKey}
            onChange={(event) => updateField("apiKey", event.target.value)}
            placeholder="sk-..."
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
            Temperature
          </span>
          <input
            className={fieldClassName}
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={config.temperature}
            onChange={(event) => updateField("temperature", Number(event.target.value))}
          />
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-500">
            <SlidersHorizontal className="h-4 w-4" />
            Max Tokens
          </span>
          <input
            className={fieldClassName}
            type="number"
            min="100"
            max="8192"
            step="100"
            value={config.maxTokens}
            onChange={(event) => updateField("maxTokens", Number(event.target.value))}
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-500">
            系统提示词
          </span>
          <textarea
            className={`${fieldClassName} min-h-32 resize-y`}
            value={config.systemPrompt}
            onChange={(event) => updateField("systemPrompt", event.target.value)}
            placeholder="输入系统提示词"
          />
        </label>
      </div>
    </SectionCard>
  );
}
