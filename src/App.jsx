import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import EncuestDashboards from './Administrador/components/pages/encuestDashboards.jsx';
import Login from './Shared/components/pages/login.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';
import AlumnsDashboard from './Administrador/components/pages/EmployersDashboard.jsx';
import { QuestionnairePage } from './Shared/components/pages/questionnairePage.jsx';
import SurveyAlumn from './Shared/components/pages/surveyAlumn.jsx';



function App() {
  return (
    <Routes>
      <Route path="/" element={<DepartamentosDashboard />} />
      <Route path="/encuestas" element={<EncuestDashboards />} />
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="formsAlumn" element={<QuestionnairePage />} />
      <Route path="survey" element={<SurveyAlumn />} />
      <Route path="alumnos" element={<AlumnsDashboard />} />

    </Routes>
  );
}

export default App;
