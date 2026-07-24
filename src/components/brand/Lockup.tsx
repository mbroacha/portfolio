import { Jackalope } from "./Jackalope";
import { cn } from "../../lib/cn";

type LockupVariant = "horizontal" | "stacked";

interface LockupProps {
  variant?: LockupVariant;
  subline?: string | null;
  markColor?: "glow" | "bone" | "moss";
  className?: string;
}

/** Name + jackalope lockup. Horizontal for nav/footer; stacked for covers. */
export const Lockup = ({
  variant = "horizontal",
  subline = "PRODUCT DESIGN",
  markColor = "glow",
  className,
}: LockupProps) => {
  if (variant === "stacked") {
    return (
      <div className={cn("flex flex-col items-center gap-2.5", className)}>
        <Jackalope size={40} variant={markColor} />
        <span className="font-display text-lg font-medium italic leading-none text-bone">
          Morgan Broacha
        </span>
        {subline ? (
          <span
            className="font-mono text-[9px] font-medium uppercase text-lichen"
            style={{ letterSpacing: "0.2em" }}
          >
            {subline}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <Jackalope size={34} variant={markColor} />
      <span className="font-display text-xl font-medium italic leading-none text-bone">
        Morgan Broacha
      </span>
    </div>
  );
};
