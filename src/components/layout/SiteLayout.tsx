import { Outlet } from "react-router-dom";

/**
 * Routing wrapper only. The Dark CV shell (grid, rail, footer) lives in
 * `components/cv/CvPage`, because the left rail content differs per page.
 */
export const SiteLayout = () => (
  <div className="min-h-screen bg-moss">
    <Outlet />
  </div>
);
