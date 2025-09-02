import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/departamentosDashboard.jsx';
import EncuestDashboards from './Administrador/components/pages/encuestDashboards.jsx';
import Login from './Shared/components/pages/login.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';
import { QuestionnairePage } from './Alumno/components/pages/QuestionnairePage.jsx';
import FormsAlumn from './Alumno/components/organism/formsAlumn.jsx';
import EmployersDashboard from './Administrador/components/pages/EmployersDashboard.jsx';
import CreateSurveyPage from './EmpleadoDepartamental/components/pages/CreateSurveyPage.jsx';
import EncuestList from './EmpleadoDepartamental/components/pages/EncuestList.jsx';
import PrivateRoute from './Shared/services/PrivateRoute.jsx';

function App() {
  return (
    <Routes>
      {/* ================== AdminGeneral ================== */}
      <Route
        path="/"
        element={
          <PrivateRoute roles={["AdminGeneral"]}>
            <DepartamentosDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/encuestas"
        element={
          <PrivateRoute roles={["AdminGeneral"]}>
            <EncuestDashboards />
          </PrivateRoute>
        }
      />
      <Route
        path="/empleados"
        element={
          <PrivateRoute roles={["AdminGeneral"]}>
            <EmployersDashboard />
          </PrivateRoute>
        }
      />

      {/* ================== Alumno ================== */}
      <Route
        path="dashboardAlumnos"
        element={
            <FormsAlumn />
        }
      />
      <Route
        path="formulariosAlumnos"
        element={
            <QuestionnairePage />
        }
      />

      {/* ================== Empleado Departamental ================== */}
      <Route
        path="crearEncuestas"
        element={
          <PrivateRoute roles={["Empleado"]}>
            <CreateSurveyPage />
          </PrivateRoute>
        }
      />
      <Route
        path="encuestasLista"
        element={
          <PrivateRoute roles={["Empleado"]}>
            <EncuestList />
          </PrivateRoute>
        }
      />

      {/* ================== Público ================== */}
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
