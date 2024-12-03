import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Estoque = () => {
  const [estoqueInicial, setEstoqueInicial] = useState('');
  const [chegada, setChegada] = useState('');
  const [estoqueFinal, setEstoqueFinal] = useState('');
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Criação do formulário com dados
    const formData = new FormData();
    formData.append('estoque_inicial', estoqueInicial);
    formData.append('chegada', chegada || 0);
    formData.append('estoque_final', estoqueFinal);
    formData.append('foto', foto);
    formData.append('data', data);

    try {
      const response = await axios.post('/api/estoque', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Token JWT do usuário
        },
      });
      setMensagem('Estoque registrado com sucesso!');
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao registrar estoque.');
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Estoque</h1>
      {mensagem && <p className="mb-4 text-green-500">{mensagem}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-bold">Estoque Inicial (kg)</label>
          <input
            type="number"
            value={estoqueInicial}
            onChange={(e) => setEstoqueInicial(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Chegada (kg)</label>
          <input
            type="number"
            value={chegada}
            onChange={(e) => setChegada(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Estoque Final (kg)</label>
          <input
            type="number"
            value={estoqueFinal}
            onChange={(e) => setEstoqueFinal(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Foto</label>
          <input
            type="file"
            onChange={(e) => setFoto(e.target.files[0])}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1 font-bold">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Registrar Estoque
        </button>
      </form>
    </div>
  );
};

export default Estoque;
