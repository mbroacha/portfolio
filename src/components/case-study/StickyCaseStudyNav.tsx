import { Link } from "react-router-dom";
import { Caption } from "../primitives/Typography";

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
      <Caption>Project</Caption>
      <p className="font-display text-lg font-medium text-bone">{title}</p>
    </div>

    {metadata.length > 0 ? (
      <dl className="space-y-4">
        {metadata.map((item) => (
          <div key={item.label}>
            <dt className="type-mono">{item.label}</dt>
            <dd className="mt-1.5 text-sm text-sage">{item.value}</dd>
          </div>
        ))}
      </dl>
    ) : null}

    <nav className="flex flex-col gap-10">
      <div className="space-y-2">
        <p className="type-mono">Sections</p>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="block pl-3 text-sm text-caption transition-[transform,color] duration-brand ease-out hover:translate-x-0.5 hover:text-bone"
          >
            {link.label}
          </a>
        ))}
      </div>
      <Link
        to="/"
        className="inline-flex items-center gap-2 no-underline transition-opacity duration-brand ease-out hover:opacity-75"
        aria-label="Back home"
      >
        <span className="type-mono text-glow">&larr; Back to work</span>
      </Link>
    </nav>
  </div>
);
