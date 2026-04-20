import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface MetadataLabelProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export const MetadataLabel = ({ label, className, ...props }: MetadataLabelProps) => (
  <span
    className={cn(
      "inline-flex w-fit rounded-sm border border-line px-2 py-1 font-mono text-xs uppercase tracking-[0.12em] text-subtext",
      className,
    )}
    {...props}
  >
    {label}
  </span>
);
