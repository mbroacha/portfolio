import { Link, useLocation } from "react-router-dom";
import { Jackalope } from "./Jackalope";
import { NavCard } from "./NavCard";
import { Interrogate } from "../query/Interrogate";

/**
 * The rail, identical on every page. No page-specific slot by design.
 *
 * Who this is, where to go, the field, and how to reach her. Before this, the
 * three sections were only reachable from the homepage: a reader who landed on
 * a case study from a shared link could get "back to work" and nowhere else.
 *
 * Anything that varies by page lives in the content column, in `PageHead`.
 */
export const SiteRail = ({ scope }: { /** Corpus scope for the field. */ scope?: string }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Link to="/" className="flex items-center gap-2.5 no-underline">
        <Jackalope size={20} className="text-bone" />
        <span className="font-display text-xl italic tracking-[0.5px] text-bone">Morgan Broacha</span>
      </Link>

      <div>
        Product designer in Oakland, California. I bring craft to difficult systems. Currently
        building {" "}
        <a href="https://sysgit.io" target="_blank" rel="noopener noreferrer" className="underline">
          Sysgit
        </a>
        .
      </div>

      <div className="flex flex-col gap-2">
        <NavCard
          to="/"
          label="Work"
          note="Selected case studies"
          active={pathname === "/" || pathname.startsWith("/case-study")}
          thumb={<Jackalope size={18} className="text-lichen" />}
        />
        <NavCard to="/what-i-do" label="How to be AI native" note="And you can too" active={pathname === "/what-i-do"} />
        <NavCard to="/about" label="About" note="Background, and the rest of it" active={pathname === "/about"} />
      </div>

      <Interrogate scope={scope} className="border-t border-hedge pt-5" />

      {/* Foot of the rail: the three things a reader leaves with.
          Bump ?v= on the resume whenever the PDF is replaced, since files in
          public/ keep their name and a returning visitor would cache the old one. */}
      <div className="mt-auto flex flex-col gap-1 border-t border-hedge pt-5">
        <a href="mailto:mbroacha@gmail.com" className="underline underline-offset-4">
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/morganbroacha/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          LinkedIn
        </a>
        <a
          href="/morgan-broacha-resume.pdf?v=2"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Resume &#8599;
        </a>
      </div>
    </>
  );
};
