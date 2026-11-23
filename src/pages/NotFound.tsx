import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CvPage } from "../components/cv/CvPage";
import { Jackalope } from "../components/cv/Jackalope";

/**
 * Any path the router does not know.
 *
 * This used to redirect silently to the homepage, which hid the one fact the
 * reader needed: the link they followed is wrong. Now it says so, in the site's
 * voice, and hands them back to the work.
 *
 * The jackalope is a Wyoming cryptid (see the answer bank), which makes a page
 * that does not exist its natural habitat. One line of joke, then the way out.
 * GitHub Pages serves dist/404.html for these paths with a real 404 status, so
 * crawlers and link unfurlers see a dead link even though the app renders.
 */
export const NotFound = () => {
  // Route pages get their <title> from static HTML (scripts/route-pages.mjs).
  // An unknown path has none of its own, so name it here, and put the old
  // title back when the reader leaves.
  useEffect(() => {
    const previous = document.title;
    document.title = "Not found · Morgan Broacha";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <CvPage scope="global">
      <div className="flex flex-col items-start gap-6 py-8 sm:py-16">
        <Jackalope size={72} className="text-tertiary" />
        <div>
          <h1 className="m-0 font-display text-[length:var(--font-size-xl)] font-normal italic text-primary">
            This page is a cryptid.
          </h1>
          <p className="mt-3 [text-wrap:balance]">Plenty of reported sightings, no evidence it exists.</p>
        </div>
        <Link to="/" className="inline-block py-1 text-primary underline underline-offset-4">
          Back to the work &rarr;
        </Link>
      </div>
    </CvPage>
  );
};
