import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";

export const SiteLayout = () => (
  <div className="flex min-h-screen flex-col">
    <div className="flex flex-1 flex-col">
      <Outlet />
    </div>
    <SiteFooter />
  </div>
);
