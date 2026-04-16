import { NavLink } from "react-router-dom";
import { MetaText } from "../primitives/Typography";

interface StickyCaseStudyNavProps {
  title: string;
  links: { id: string; label: string }[];
}

export const StickyCaseStudyNav = ({ title, links }: StickyCaseStudyNavProps) => (
  <div className="top-8 space-y-5 md:sticky">
    <MetaText>{title}</MetaText>
    <nav className="space-y-3">
      {links.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className="block border-l border-transparent pl-3 text-sm text-subtext transition hover:border-accent hover:text-ink"
        >
          {link.label}
        </a>
      ))}
      <NavLink
        to="/"
        className="mt-8 inline-block border-b border-line pb-1 text-xs uppercase tracking-[0.12em] text-subtext transition hover:border-accent hover:text-ink"
      >
        Back home
      </NavLink>
    </nav>
  </div>
);
