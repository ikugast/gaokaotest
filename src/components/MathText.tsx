import Latex from "react-latex-next";
import { cn } from "@/lib/utils";

type MathTextProps = {
  text: string;
  className?: string;
  inline?: boolean;
};

export function MathText({ text, className, inline = false }: MathTextProps) {
  if (inline) {
    return (
      <span className={className}>
        <Latex>{text}</Latex>
      </span>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {text.split("\n").map((line, index) => (
        <div key={`${line}-${index}`} className="leading-8">
          <Latex>{line.trim() ? line : "~"}</Latex>
        </div>
      ))}
    </div>
  );
}
