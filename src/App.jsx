import { Routes, Route } from 'react-router-dom';
import DepartamentosDashboard from './Administrador/components/pages/DepartamentosDashboard.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DepartamentosDashboard />} />
    </Routes>
  );
}

export default App;
