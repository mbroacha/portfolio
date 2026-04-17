import { BodyText, SectionTitle } from "../primitives/Typography";

interface DecisionBlockProps {
  title: string;
  rationale: string;
  impact: string;
}

export const DecisionBlock = ({ title, rationale, impact }: DecisionBlockProps) => (
  <article className="space-y-4 border border-line p-6">
    <SectionTitle className="text-xl">{title}</SectionTitle>
    <BodyText>{rationale}</BodyText>
    <p className="border-t border-line pt-4 text-sm text-subtext">
      <span className="font-medium text-ink">Impact:</span> {impact}
    </p>
  </article>
);
