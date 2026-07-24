import { cn } from "../../lib/cn";

interface StatProps {
  value: string;
  caption?: string;
  variant?: "glow" | "ember";
  label?: string;
  className?: string;
}

/** Big Newsreader stat with Archivo caption. Ember for in-dashboard data only. */
export const Stat = ({ value, caption, variant = "glow", label, className }: StatProps) => (
  <div className={cn("flex flex-col gap-1.5", className)}>
    {label ? <span className="type-mono">{label}</span> : null}
    <span className={cn("type-stat", variant === "ember" && "type-stat--ember")}>{value}</span>
    {caption ? <p className="max-w-[38ch] text-[13px] leading-[1.5] text-sage">{caption}</p> : null}
  </div>
);
