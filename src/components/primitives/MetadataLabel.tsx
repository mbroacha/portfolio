import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

interface MetadataLabelProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export const MetadataLabel = ({ label, className, ...props }: MetadataLabelProps) => (
  <span
    className={cn(
      "type-meta inline-flex w-fit rounded-sm border border-line bg-panel px-2 py-1 text-subtext",
      className,
    )}
    {...props}
  >
    {label}
  </span>
);
