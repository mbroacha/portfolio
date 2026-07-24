import { cn } from "../../lib/cn";

type TagTone = "glow" | "ember" | "neutral";

interface TagProps {
  children: string;
  tone?: TagTone;
  /** @deprecated Prefer `tone` — kept for StatusTag migration */
  variant?: TagTone;
  className?: string;
}

const toneClass: Record<TagTone, string> = {
  glow: "type-tag type-tag--glow",
  ember: "type-tag type-tag--ember",
  neutral: "type-tag type-tag--neutral",
};

/** Mono status / taxonomy chip. Transparent fill, 1px border at 40% of text color. */
export const Tag = ({ children, tone, variant = "neutral", className }: TagProps) => (
  <span className={cn(toneClass[tone ?? variant], className)}>{children}</span>
);

/** @deprecated Prefer `Tag` */
export const StatusTag = Tag;
