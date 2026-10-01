import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { HomePage } from "./pages/HomePage";
import { Originality } from "./pages/Originality";
import { Sysgit } from "./pages/Sysgit";
import { WhatIDo } from "./pages/WhatIDo";
import { About } from "./pages/About";
import { Beacon } from "./pages/Beacon";
import { GradescopeMobile } from "./pages/GradescopeMobile";

const App = () => (
  <Routes>
    <Route element={<SiteLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/case-study/originality" element={<Originality />} />
      <Route path="/case-study/sysgit" element={<Sysgit />} />
      <Route path="/case-study/beacon" element={<Beacon />} />
      <Route path="/case-study/gradescope-mobile" element={<GradescopeMobile />} />
      <Route path="/what-i-do" element={<WhatIDo />} />
      <Route path="/about" element={<About />} />
      {/* Renamed. Anything already shared keeps working. */}
      <Route path="/how-i-work" element={<Navigate to="/what-i-do" replace />} />
      <Route path="/case-study/:slug" element={<CaseStudyPage />} />
      <Route path="/case-study" element={<Navigate to="/case-study/originality" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
