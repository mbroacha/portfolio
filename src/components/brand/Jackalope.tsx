import { cn } from "../../lib/cn";

type JackalopeVariant = "glow" | "bone" | "moss";

interface JackalopeProps {
  size?: number;
  variant?: JackalopeVariant;
  className?: string;
  /** Accessible label when the mark is meaningful (not decorative). */
  label?: string;
}

const variantClass: Record<JackalopeVariant, string> = {
  glow: "jackalope",
  bone: "jackalope jackalope--bone",
  moss: "jackalope jackalope--moss",
};

/**
 * One-color jackalope stamp via CSS mask.
 * Approved: Glow/Bone on Moss; Moss on Glow/Bone. Never rotate, outline, or gradient-fill.
 * Clear space: ½ mark width. Min digital size 24px.
 */
export const Jackalope = ({
  size = 34,
  variant = "glow",
  className,
  label,
}: JackalopeProps) => (
  <span
    className={cn("inline-block shrink-0", variantClass[variant], className)}
    style={{ width: size, height: size }}
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
  />
);
