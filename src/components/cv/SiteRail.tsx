import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBrain, faFaceLaugh, faPenNib, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Jackalope } from "./Jackalope";
import { NavCard } from "./NavCard";
import { Interrogate } from "../query/Interrogate";
import { asset } from "../../lib/asset";
import { cn } from "../../lib/cn";

/**
 * The site chrome, identical on every page. No page-specific slot by design.
 *
 * Who this is, where to go, the field, and how to reach her. Before this, the
 * three sections were only reachable from the homepage: a reader who landed on
 * a case study from a shared link could get "back to work" and nowhere else.
 *
 * The pieces are assembled two ways. At `lg` and up they stack in the sticky
 * rail (`SiteRail`). Below that, a rail stacked above the content cost a phone
 * reader ~700px before the page title, so the name and nav become a slim
 * header (`SiteHeader`) and the field and contact move after the content
 * (`SiteFooter`). Asking a question before reading the case study is backwards
 * on a phone anyway.
 *
 * Anything that varies by page lives in the content column, in `PageHead`.
 */

const SiteName = () => (
  <Link to="/" className="flex items-center gap-2.5 no-underline">
    <Jackalope size={20} className="text-bone" />
    <span className="font-display text-xl italic tracking-[0.5px] text-bone">Morgan Broacha</span>
  </Link>
);

const Bio = () => (
  <div>
    Product designer in Oakland, California. I bring craft to difficult systems. Currently building{" "}
    <a href="https://sysgit.io" target="_blank" rel="noopener noreferrer" className="underline">
      Sysgit
    </a>
    .
  </div>
);

const SiteNav = () => {
  const { pathname } = useLocation();
  return (
    <nav aria-label="Site" className="flex flex-col gap-2">
      <NavCard
        to="/"
        label="Work"
        note="Selected projects"
        active={pathname === "/" || pathname.startsWith("/case-study")}
        thumb={<FontAwesomeIcon icon={faPenNib} className="h-[18px] w-[18px] text-lichen" />}
      />
      <NavCard
        to="/what-i-do"
        label="On being AI native"
        note="An evolving process"
        active={pathname === "/what-i-do"}
        thumb={<FontAwesomeIcon icon={faBrain} className="h-[18px] w-[18px] text-lichen" />}
      />
      <NavCard
        to="/about"
        label="About"
        note="Let me introduce myself"
        active={pathname === "/about"}
        thumb={<FontAwesomeIcon icon={faFaceLaugh} className="h-[18px] w-[18px] text-lichen" />}
      />
    </nav>
  );
};

/** The three things a reader leaves with.
    Bump ?v= on the resume whenever the PDF is replaced, since files in
    public/ keep their name and a returning visitor would cache the old one. */
const ContactLinks = ({ className }: { className?: string }) => (
  <div className={cn("flex flex-col", className)}>
    {/* py-1: a 12px link is an 18px target on its own, under the 24px minimum. */}
    <a href="mailto:mbroacha@gmail.com" className="self-start py-1 underline underline-offset-4">
      Email
    </a>
    <a
      href="https://www.linkedin.com/in/morganbroacha/"
      target="_blank"
      rel="noopener noreferrer"
      className="self-start py-1 underline underline-offset-4"
    >
      LinkedIn
    </a>
    <a
      href={asset("/morgan-broacha-resume.pdf?v=2")}
      target="_blank"
      rel="noopener noreferrer"
      className="self-start py-1 underline underline-offset-4"
    >
      Resume &#8599;
    </a>
  </div>
);

/** Desktop: the sticky left rail. */
export const SiteRail = ({ scope }: { /** Corpus scope for the field. */ scope?: string }) => (
  <>
    <SiteName />
    <Bio />
    <SiteNav />
    <Interrogate scope={scope} className="border-t border-hedge pt-5" />
    <ContactLinks className="mt-auto border-t border-hedge pt-4" />
  </>
);

/** Below `lg`: name and a menu holding the nav cards. */
export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { pathname } = useLocation();

  // A nav card leads to a new page; the menu should not follow the reader there.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="cv-meta sticky top-0 z-40 border-b border-hedge bg-fern lg:hidden">
      <div className="flex items-center justify-between gap-4 py-1.5 pl-8 pr-5">
        <SiteName />
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 cursor-pointer items-center gap-2 border-0 bg-transparent px-3 uppercase text-bone"
          style={{ letterSpacing: "var(--tracking-label)" }}
        >
          {open ? "Close" : "Menu"}
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div id={panelId} hidden={!open} className="border-t border-hedge px-8 pb-6 pt-4">
        <SiteNav />
      </div>
    </header>
  );
};

/** Below `lg`: what the rail carried besides navigation, after the content. */
export const SiteFooter = ({ scope }: { scope?: string }) => (
  <section aria-label="About and contact" className="cv-meta flex flex-col gap-6 border-t border-hedge p-8 lg:hidden">
    <Bio />
    <Interrogate scope={scope} className="border-t border-hedge pt-5" />
    <ContactLinks className="border-t border-hedge pt-4" />
  </section>
);
