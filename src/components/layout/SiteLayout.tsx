import { Suspense } from "react";
import { Outlet } from "react-router-dom";

/**
 * Routing wrapper only. The Dark CV shell (grid, rail, footer) lives in
 * `components/cv/CvPage`, because the left rail content differs per page.
 *
 * Suspense: most pages load as their own chunk (see App.tsx). The fallback is
 * the empty page background, not a spinner: chunks are prefetched once the
 * first page is idle, so a wait is rare and brief, and a spinner flashing for
 * a few frames reads worse than a moment of the same dark ground.
 */
export const SiteLayout = () => (
  <div className="min-h-screen bg-page">
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  </div>
);
