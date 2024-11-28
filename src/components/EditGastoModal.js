import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditGastoModal = ({ gasto, isOpen, onClose, onUpdate }) => {
  const [valor, setValor] = useState('');
  const [recebedor, setRecebedor] = useState('');
  const [tipo, setTipo] = useState('');

  useEffect(() => {
    if (gasto) {
      setValor(gasto.valor);
      setRecebedor(gasto.recebedor);
      setTipo(gasto.tipo);
    }
  }, [gasto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedGasto = { ...gasto, valor: parseFloat(valor), recebedor, tipo };
    const response = await axios.put(`http://localhost:3001/api/${gasto.id}`, updatedGasto);
    
    onUpdate(response.data); // Atualiza a lista de gastos
    onClose(); // Fecha o modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Editar Gasto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Valor</label>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Recebedor</label>
            <input
              type="text"
              value={recebedor}
              onChange={(e) => setRecebedor(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Tipo</label>
            <input
              type="text"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGastoModal;
