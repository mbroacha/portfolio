import { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";

/*
 * Every page but the homepage loads as its own chunk.
 *
 * The site used to ship as one 460KB bundle, so the homepage, the page most
 * readers see first and often the only one, downloaded every case study's
 * product recreations before it could render. The homepage and the not-found
 * page stay in the main bundle; everything else arrives on demand, and is
 * warmed in the background once the first page is idle (below), so following
 * a link still feels instant.
 *
 * Keep the `element={<Name />}` form on each route: scripts/build-answers.mjs
 * reads it to find each page's source file.
 */
const load = {
  Originality: () => import("./pages/Originality"),
  Sysgit: () => import("./pages/Sysgit"),
  WhatIDo: () => import("./pages/WhatIDo"),
  About: () => import("./pages/About"),
  Beacon: () => import("./pages/Beacon"),
  GradescopeMobile: () => import("./pages/GradescopeMobile"),
};

const Originality = lazy(() => load.Originality().then((m) => ({ default: m.Originality })));
const Sysgit = lazy(() => load.Sysgit().then((m) => ({ default: m.Sysgit })));
const WhatIDo = lazy(() => load.WhatIDo().then((m) => ({ default: m.WhatIDo })));
const About = lazy(() => load.About().then((m) => ({ default: m.About })));
const Beacon = lazy(() => load.Beacon().then((m) => ({ default: m.Beacon })));
const GradescopeMobile = lazy(() => load.GradescopeMobile().then((m) => ({ default: m.GradescopeMobile })));

/** Fetch the other pages' chunks after the first page settles. Idle time only,
    so it never competes with what the reader is looking at. */
const usePrefetchPages = () => {
  useEffect(() => {
    const warm = () => Object.values(load).forEach((fn) => void fn());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 2000);
    return () => clearTimeout(id);
  }, []);
};

const App = () => {
  usePrefetchPages();
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/case-study/originality" element={<Originality />} />
        <Route path="/case-study/sysgit" element={<Sysgit />} />
        <Route path="/case-study/beacon" element={<Beacon />} />
        <Route path="/case-study/gradescope-mobile" element={<GradescopeMobile />} />
        <Route path="/how-i-work" element={<WhatIDo />} />
        <Route path="/about" element={<About />} />
        {/* Renamed. Anything already shared keeps working. */}
        <Route path="/what-i-do" element={<Navigate to="/how-i-work" replace />} />
        <Route path="/case-study" element={<Navigate to="/case-study/originality" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
