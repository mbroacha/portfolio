import { BodyText, MetaText } from "../primitives/Typography";

interface SystemSnapshotProps {
  title: string;
  value: string;
  note: string;
}

export const SystemSnapshot = ({ title, value, note }: SystemSnapshotProps) => (
  <article className="space-y-2 rounded-md border border-line p-5">
    <MetaText>{title}</MetaText>
    <p className="text-3xl font-medium tracking-[-0.02em] text-ink">{value}</p>
    <BodyText className="text-sm text-subtext">{note}</BodyText>
  </article>
);
