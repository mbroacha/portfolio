import { NavLink } from "react-router-dom";
import siteLogoPri from "../../assets/site.logo.pri.svg?raw";
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
            <dt className="type-caption">{item.label}</dt>
            <dd className="mt-1 text-sm text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>
    ) : null}

    <nav className="flex flex-col gap-10">
      <div className="space-y-2">
        <p className="type-caption">Sections</p>
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="block pl-3 text-sm text-subtext transition-[transform,color] duration-150 ease-out hover:translate-x-0.5 hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </div>
      <NavLink
        to="/"
        className="block h-8 w-8 shrink-0 p-0 leading-none text-accent no-underline transition-opacity duration-200 ease-out hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label="Back home"
      >
        <span
          className="block h-full w-full [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:max-w-none"
          aria-hidden
          dangerouslySetInnerHTML={{ __html: siteLogoPri }}
        />
      </NavLink>
    </nav>
  </div>
);
