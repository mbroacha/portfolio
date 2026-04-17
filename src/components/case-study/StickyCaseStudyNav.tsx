import { NavLink } from "react-router-dom";
import { MetaText } from "../primitives/Typography";

interface RailMetadataItem {
  label: string;
  value: string;
}

interface StickyCaseStudyNavProps {
  title: string;
  metadata?: RailMetadataItem[];
  links: { id: string; label: string }[];
}

export const StickyCaseStudyNav = ({ title, metadata = [], links }: StickyCaseStudyNavProps) => (
  <div className="space-y-8">
    <div className="space-y-3">
      <MetaText>Project</MetaText>
      <p className="text-sm font-medium text-ink">{title}</p>
    </div>

    {metadata.length > 0 ? (
      <dl className="space-y-3">
        {metadata.map((item) => (
          <div key={item.label}>
            <dt className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">{item.label}</dt>
            <dd className="mt-1 text-sm text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    ) : null}

    <nav className="space-y-2">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-subtext">Sections</p>
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="block pl-3 text-sm text-subtext"
        >
          {link.label}
        </a>
      ))}
      <NavLink
        to="/"
        className="mt-8 inline-block text-xs uppercase tracking-[0.12em] text-subtext"
      >
        Back home
      </NavLink>
    </nav>
  </div>
);
