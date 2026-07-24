import { Outlet } from "react-router-dom";
import { SiteNav } from "./SiteNav";

export const SiteLayout = () => (
  <div className="flex min-h-screen flex-col bg-moss">
    <div className="page-shell flex min-h-screen flex-col">
      <SiteNav />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  </div>
);
