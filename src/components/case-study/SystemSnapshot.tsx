import { BodyText, MetaText } from "../primitives/Typography";

interface SystemSnapshotProps {
  title: string;
  value: string;
  note: string;
}

export const SystemSnapshot = ({ title, value, note }: SystemSnapshotProps) => (
  <div className="rounded-md border border-line p-5">
    <MetaText>{title}</MetaText>
    <p className="mt-2 text-3xl font-semibold tracking-[-0.02em]">{value}</p>
    <BodyText className="mt-2 text-sm text-subtext">{note}</BodyText>
  </div>
);
