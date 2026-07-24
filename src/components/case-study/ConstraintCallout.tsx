import { BodyText } from "../primitives/Typography";

interface ConstraintCalloutProps {
  title: string;
  detail: string;
}

export const ConstraintCallout = ({ title, detail }: ConstraintCalloutProps) => (
  <aside className="gh-card flex flex-col gap-3 p-8">
    <span className="type-mono type-mono--glow">Constraint</span>
    <BodyText className="font-medium text-bone">{title}</BodyText>
    <BodyText>{detail}</BodyText>
  </aside>
);
