import { Navigate, Route, Routes } from "react-router-dom";
import { caseStudies } from "./data/caseStudies";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { HomePage } from "./pages/HomePage";

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/case-study/:slug" element={<CaseStudyPage />} />
    <Route path="/case-study" element={<Navigate to={`/case-study/${caseStudies[0].slug}`} replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
