import { cn } from "../../lib/cn";

interface ImagePlaceholderProps {
  label?: string;
  className?: string;
  height?: number | string;
  /** Darker stripe set for moss-ground contexts */
  dark?: boolean;
  radius?: "none" | "md" | "lg";
  bordered?: boolean;
}

/**
 * Striped media slot with centered mono label chip — until real shots exist.
 * Alias for handoff PlaceholderMedia.
 */
export const ImagePlaceholder = ({
  label = "[ product shot ]",
  className,
  height = 260,
  dark = false,
  radius = "none",
  bordered = false,
}: ImagePlaceholderProps) => (
  <div
    className={cn(
      "image-placeholder grid place-items-center",
      dark && "image-placeholder--dark",
      radius === "md" && "rounded-md",
      radius === "lg" && "rounded-lg",
      bordered && "border border-hedge",
      className,
    )}
    style={{ height }}
  >
    <span className="image-placeholder__label">{label}</span>
  </div>
);

/** @deprecated Prefer `ImagePlaceholder` */
export const PlaceholderMedia = ImagePlaceholder;
