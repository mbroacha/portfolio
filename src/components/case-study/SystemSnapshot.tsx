import { Stat } from "../brand/Stat";

interface SystemSnapshotProps {
  title: string;
  value: string;
  note: string;
  variant?: "glow" | "ember";
}

export const SystemSnapshot = ({ title, value, note, variant = "glow" }: SystemSnapshotProps) => (
  <article className="gh-card p-6">
    <Stat value={value} caption={note} variant={variant} label={title} />
  </article>
);
