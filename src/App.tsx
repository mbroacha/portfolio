import { Navigate, Route, Routes } from "react-router-dom";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { HomePage } from "./pages/HomePage";
import { Originality } from "./pages/Originality";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/case-study/originality" element={<Originality />} />
    <Route path="/case-study/:slug" element={<CaseStudyPage />} />
    <Route path="/case-study" element={<Navigate to="/case-study/originality" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
