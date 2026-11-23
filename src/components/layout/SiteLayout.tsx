import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { RouteErrorBoundary } from "./RouteErrorBoundary";
import { ScrollOnNavigate } from "./ScrollOnNavigate";

/**
 * Routing wrapper only. The Dark CV shell (grid, rail, footer) lives in
 * `components/cv/CvPage`, because the left rail content differs per page.
 *
 * Suspense: most pages load as their own chunk (see App.tsx). The fallback is
 * the empty page background, not a spinner: chunks are prefetched once the
 * first page is idle, so a wait is rare and brief, and a spinner flashing for
 * a few frames reads worse than a moment of the same dark ground.
 *
 * ScrollOnNavigate: a link opens a page at its top, or at the section it
 * names. Back and forward keep the browser's own position.
 *
 * RouteErrorBoundary: a chunk that fails to load would otherwise unmount the
 * whole tree. Keyed by path, so following a link out of the error resets it.
 */
export const SiteLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-page">
      <ScrollOnNavigate />
      <RouteErrorBoundary key={pathname}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </RouteErrorBoundary>
    </div>
  );
};
