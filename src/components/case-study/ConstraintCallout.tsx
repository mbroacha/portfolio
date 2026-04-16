import { BodyText, MetaText } from "../primitives/Typography";

interface ConstraintCalloutProps {
  title: string;
  detail: string;
}

export const ConstraintCallout = ({ title, detail }: ConstraintCalloutProps) => (
  <aside className="border-l-2 border-accent pl-5">
    <MetaText className="text-accent">Constraint</MetaText>
    <BodyText className="mt-2 font-medium">{title}</BodyText>
    <BodyText className="mt-2 text-ink/75">{detail}</BodyText>
  </aside>
);
