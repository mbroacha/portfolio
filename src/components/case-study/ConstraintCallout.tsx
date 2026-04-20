import { BodyText, MetaText } from "../primitives/Typography";

interface ConstraintCalloutProps {
  title: string;
  detail: string;
}

export const ConstraintCallout = ({ title, detail }: ConstraintCalloutProps) => (
  <aside className="space-y-2 rounded-md border border-line p-5">
    <MetaText>Constraint</MetaText>
    <BodyText className="font-medium">{title}</BodyText>
    <BodyText className="text-ink/75">{detail}</BodyText>
  </aside>
);
