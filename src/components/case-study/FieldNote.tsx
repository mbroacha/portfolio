import { BodyText, MetaText } from "../primitives/Typography";

interface FieldNoteProps {
  children: string;
}

export const FieldNote = ({ children }: FieldNoteProps) => (
  <article className="space-y-3 border border-line p-5">
    <MetaText>Field note</MetaText>
    <BodyText>{children}</BodyText>
  </article>
);
