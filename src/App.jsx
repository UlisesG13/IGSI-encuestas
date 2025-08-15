import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import Login from './Shared/components/pages/login.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<DepartamentosDashboard />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}

export default App;
