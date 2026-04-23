import { cn } from "../../lib/cn";

interface MetadataLabelProps {
  label: string;
  className?: string;
}

export const MetadataLabel = ({ label, className }: MetadataLabelProps) => (
  <span className={cn("type-tag", className)}>{label}</span>
);
