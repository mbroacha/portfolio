import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";

export const SiteLayout = () => (
  <div className="flex min-h-screen flex-col">
    <Outlet />
    <SiteFooter />
  </div>
);
