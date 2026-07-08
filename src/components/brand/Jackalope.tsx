import { cn } from "../../lib/cn";

type JackalopeVariant = "glow" | "bone" | "moss";

interface JackalopeProps {
  size?: number;
  variant?: JackalopeVariant;
  className?: string;
}

const variantClass: Record<JackalopeVariant, string> = {
  glow: "jackalope",
  bone: "jackalope jackalope--bone",
  moss: "jackalope jackalope--moss",
};

export const Jackalope = ({ size = 34, variant = "glow", className }: JackalopeProps) => (
  <span
    className={cn("inline-block shrink-0", variantClass[variant], className)}
    style={{ width: size, height: size }}
    aria-hidden
  />
);
