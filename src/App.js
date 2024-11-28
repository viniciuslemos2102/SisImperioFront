import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GastosForm from './components/GastosForm';
import GastosList from './components/GastosList';
import AdicionarCarne from './components/AdicionarCarne'; // Importando a nova funcionalidade

const App = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      const response = await axios.get('http://localhost:3001/api');
      setGastos(response.data);
    };

    fetchGastos();
  }, []);

  const adicionarGasto = async (gasto) => {
    const response = await axios.post('http://localhost:3001/api', gasto);
    setGastos([...gastos, response.data]); // Adiciona o gasto retornado pelo backend
  };

  const removerGasto = async (id) => {
    await axios.delete(`http://localhost:3001/api/${id}`);
    setGastos(gastos.filter((gasto) => gasto.id !== id));
  };

  const editarGasto = async (gasto) => {
    const response = await axios.put(`http://localhost:3001/api/${gasto.id}`, gasto);
    const updatedGastos = gastos.map((g) => (g.id === gasto.id ? response.data : g));
    setGastos(updatedGastos);
    return response.data; // Retorna o gasto atualizado
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<GastosList gastos={gastos} removerGasto={removerGasto} editarGasto={editarGasto} />} />
            <Route path="/add" element={<GastosForm onSave={adicionarGasto} />} />
            <Route path="/adicionar-carne" element={<AdicionarCarne />} /> {/* Nova rota */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
