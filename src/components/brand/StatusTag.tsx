import { cn } from "../../lib/cn";

type StatusTagVariant = "glow" | "ember" | "neutral";

interface StatusTagProps {
  children: string;
  variant?: StatusTagVariant;
  className?: string;
}

const variantClass: Record<StatusTagVariant, string> = {
  glow: "type-tag type-tag--glow",
  ember: "type-tag type-tag--ember",
  neutral: "type-tag type-tag--neutral",
};

export const StatusTag = ({ children, variant = "neutral", className }: StatusTagProps) => (
  <span className={cn(variantClass[variant], className)}>{children}</span>
);
