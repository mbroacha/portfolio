import { StatusTag } from "../brand/StatusTag";
import { cn } from "../../lib/cn";

type TagVariant = "glow" | "ember" | "neutral";

interface MetadataLabelProps {
  label: string;
  variant?: TagVariant;
  className?: string;
}

export const MetadataLabel = ({ label, variant = "neutral", className }: MetadataLabelProps) => (
  <StatusTag variant={variant} className={cn(className)}>
    {label}
  </StatusTag>
);
