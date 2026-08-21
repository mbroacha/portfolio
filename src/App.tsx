import { Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/layout/SiteLayout";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { HomePage } from "./pages/HomePage";
import { Originality } from "./pages/Originality";
import { Sysgit } from "./pages/Sysgit";
import { HowIWork } from "./pages/HowIWork";
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
      <Route path="/how-i-work" element={<HowIWork />} />
      <Route path="/case-study/:slug" element={<CaseStudyPage />} />
      <Route path="/case-study" element={<Navigate to="/case-study/originality" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default App;
