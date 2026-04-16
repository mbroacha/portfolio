import { BodyText, SectionTitle } from "../primitives/Typography";

interface DecisionBlockProps {
  title: string;
  rationale: string;
  impact: string;
}

export const DecisionBlock = ({ title, rationale, impact }: DecisionBlockProps) => (
  <article className="rounded-md border border-line bg-panel p-6">
    <SectionTitle className="text-2xl">{title}</SectionTitle>
    <BodyText className="mt-4">{rationale}</BodyText>
    <BodyText className="mt-4 border-t border-line pt-4 text-ink/75">Impact: {impact}</BodyText>
  </article>
);
