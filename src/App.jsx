import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import EncuestDashboards from './Administrador/components/pages/encuestDashboards.jsx';
import Login from './Shared/components/pages/login.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';
import FormsAlumn from './Shared/components/organism/formsAlumn.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DepartamentosDashboard />} />
      <Route path="/encuestas" element={<EncuestDashboards />} />
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route path="formsAlumn" element={<FormsAlumn />} />


    </Routes>
  );
}

export default App;
