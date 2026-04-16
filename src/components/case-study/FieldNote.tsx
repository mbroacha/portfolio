import { BodyText, MetaText } from "../primitives/Typography";

interface FieldNoteProps {
  children: string;
}

export const FieldNote = ({ children }: FieldNoteProps) => (
  <article className="rounded-md border border-line bg-panel/70 p-5">
    <MetaText>Field note</MetaText>
    <BodyText className="mt-3">{children}</BodyText>
  </article>
);
