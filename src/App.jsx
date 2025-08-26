import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import EncuestDashboards from './Administrador/components/pages/encuestDashboards.jsx';
import Login from './Shared/components/pages/login.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';
import AlumnsDashboard from './Administrador/components/pages/EmployersDashboard.jsx';
import { QuestionnairePage } from './Alumno/components/pages/QuestionnairePage.jsx';
import SurveyAlumn from './Alumno/components/pages/surveyAlumn.jsx';
import EmployersDashboard from './Administrador/components/pages/EmployersDashboard.jsx';


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
      <Route path="/empleados" element={<EmployersDashboard/>}></Route>
    </Routes>
  );
}

export default App;
