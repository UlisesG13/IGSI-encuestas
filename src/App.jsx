import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import EncuestDashboards from './Administrador/components/pages/encuestDashboards.jsx';
import Login from './Shared/components/pages/login.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';
import AlumnsDashboard from './Administrador/components/pages/EmployersDashboard.jsx';
import { QuestionnairePage } from './Alumno/components/pages/QuestionnairePage.jsx';
import SurveyAlumn from './Alumno/components/pages/surveyAlumn.jsx';
import EmployersDashboard from './Administrador/components/pages/EmployersDashboard.jsx';
import CreateSurveyPage from './EmpleadoDepartamental/components/pages/CreateSurveyPage.jsx';
import EncuestList from './EmpleadoDepartamental/components/pages/EncuestList.jsx';



function App() {
  return (
    <Routes>
      {/* admin routes */}
      <Route path="/" element={<DepartamentosDashboard />} />
      <Route path="/encuestas" element={<EncuestDashboards />} />
      <Route path="/empleados" element={<EmployersDashboard />} />
      
      {/* alumnos routes */}
      <Route path="dashboardAlumnos" element={<SurveyAlumn />} />
      <Route path="formulariosAlumnos" element={<QuestionnairePage />} />

      {/* EmpleadoDepartamental routes */}
      <Route path="crearEncuestas" element={<CreateSurveyPage />} />
      <Route path="encuestasLista" element={<EncuestList></EncuestList>} />


      <Route path="login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />

    </Routes>
  );
}

export default App;
//manu estuvo aki