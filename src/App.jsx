import { Routes, Route } from 'react-router-dom';
import Login from './Shared/components/pages/login.jsx';
import './Administrador/components/styles/index.css';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';
import PageNotFound from './Shared/components/pages/pageNotFound.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DepartamentosDashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />

    </Routes>
  );
}

export default App;
