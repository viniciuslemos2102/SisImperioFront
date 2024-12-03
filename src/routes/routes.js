import React from 'react';
import { Route } from 'react-router-dom';
import GastosList from '../components/GastosList';
import GastosForm from '../components/GastosForm';
import AdicionarCarne from '../components/AdicionarCarne';
import Estoque from '../pages/Estoque';

const RoutesConfig = ({ gastos, removerGasto, editarGasto, adicionarGasto }) => (
  <>
    <Route path="/" element={<GastosList gastos={gastos} removerGasto={removerGasto} editarGasto={editarGasto} />} />
    <Route path="/add" element={<GastosForm onSave={adicionarGasto} />} />
    <Route path="/adicionar-carne" element={<AdicionarCarne />} />
    <Route path="/estoque" element={<Estoque />} />
  </>
);

export default RoutesConfig;
