import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import EncuestDashboards from './Administrador/components/pages/encuestDashboards.jsx';
import Login from './Shared/components/pages/login.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';
import SurveyAlumn from './Shared/components/pages/surveyAlumn.jsx';
import FormsAlumn from './Shared/components/organism/formsAlumn.jsx';
import AlumnsDashboard from './Administrador/components/pages/EmployersDashboard.jsx';
import EncuestList from './EmpleadoDepartamental/components/pages/EncuestList.jsx';
import CreateSurveyPage from './EmpleadoDepartamental/components/pages/CreateSurveyPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DepartamentosDashboard />} />
      <Route path="/encuestas" element={<EncuestDashboards />} />
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="formsAlumn" element={<SurveyAlumn />} />
      <Route path="formsAlumn" element={<FormsAlumn />} />
      <Route path="alumnos" element={<AlumnsDashboard />} />
      <Route path="encuestasDepartamental" element={<EncuestList />} />
      <Route path="createSurvey" element={<CreateSurveyPage />} />
    </Routes>
  );
}

export default App;
