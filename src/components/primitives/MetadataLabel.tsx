import { Tag } from "../brand/Tag";
import { cn } from "../../lib/cn";

type TagTone = "glow" | "ember" | "neutral";

interface MetadataLabelProps {
  label: string;
  variant?: TagTone;
  className?: string;
}

export const MetadataLabel = ({ label, variant = "neutral", className }: MetadataLabelProps) => (
  <Tag tone={variant} className={cn(className)}>
    {label}
  </Tag>
);
