import { cn } from "../../lib/cn";

interface StatProps {
  value: string;
  caption: string;
  variant?: "glow" | "ember";
  label?: string;
  className?: string;
}

export const Stat = ({ value, caption, variant = "glow", label, className }: StatProps) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    {label ? <span className="type-mono">{label}</span> : null}
    <span className={cn("type-stat", variant === "ember" && "type-stat--ember")}>{value}</span>
    <p className="type-body max-w-[38ch] text-sm">{caption}</p>
  </div>
);
