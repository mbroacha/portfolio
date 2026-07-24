import type { ReactNode } from "react";
import { BodyText } from "../primitives/Typography";

interface InsightCardProps {
  label: string;
  variant: "glow" | "ember";
  children: ReactNode;
}

const InsightCard = ({ label, variant, children }: InsightCardProps) => (
  <div className="gh-card flex flex-col gap-3 p-8">
    <span className={variant === "glow" ? "type-mono type-mono--glow" : "type-mono type-mono--ember"}>
      {label}
    </span>
    <BodyText>{children}</BodyText>
  </div>
);

interface InsightPairProps {
  insight: ReactNode;
  opportunity: ReactNode;
}

export const InsightPair = ({ insight, opportunity }: InsightPairProps) => (
  <div className="grid gap-5 md:grid-cols-2">
    <InsightCard label="Insight" variant="glow">
      {insight}
    </InsightCard>
    <InsightCard label="Opportunity" variant="ember">
      {opportunity}
    </InsightCard>
  </div>
);
