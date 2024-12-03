import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GastosForm from './components/GastosForm';
import GastosList from './components/GastosList';
import Estoque from './pages/Estoque';
import AdicionarCarne from './components/AdicionarCarne';
import Login from './pages/Login';
import RequireAuth from './components/RequireAuth';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api');
        setGastos(response.data);
      } catch (error) {
        console.error('Erro ao buscar gastos:', error);
      }
    };

    fetchGastos();
  }, []);

  const adicionarGasto = async (gasto) => {
    try {
      const response = await axios.post('http://localhost:3001/api', gasto);
      setGastos([...gastos, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar gasto:', error);
    }
  };

  const removerGasto = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/${id}`);
      setGastos(gastos.filter((gasto) => gasto.id !== id));
    } catch (error) {
      console.error('Erro ao remover gasto:', error);
    }
  };

  const editarGasto = async (gasto) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/${gasto.id}`, gasto);
      setGastos(gastos.map((g) => (g.id === gasto.id ? response.data : g)));
    } catch (error) {
      console.error('Erro ao editar gasto:', error);
    }
  };

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            {/* Rota de Login */}
            <Route path="/login" element={<Login />} />

            {/* Rotas protegidas */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <div>
                    <LogoutButton />
                    <GastosList
                      gastos={gastos}
                      removerGasto={removerGasto}
                      editarGasto={editarGasto}
                    />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/add"
              element={
                <RequireAuth>
                  <div>
                    <LogoutButton />
                    <GastosForm onSave={adicionarGasto} />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/adicionar-carne"
              element={
                <RequireAuth>
                  <div>
                    <LogoutButton />
                    <AdicionarCarne />
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/estoque"
              element={
                <RequireAuth>
                  <div>
                    <LogoutButton />
                    <Estoque />
                  </div>
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
