// components/AdicionarCarne.js
import React, { useState } from 'react';
import axios from 'axios';

const AdicionarCarne = () => {
  const [formData, setFormData] = useState({
    compras: '',
    carnesPrime: '',
    fixos: '',
    variaveis: '',
    passagens: '',
    naoIdentificados: '',
    comprasEmDinheiro: '',
    extra: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/carnes', formData);
      console.log('Carne adicionada:', response.data);
      // Você pode adicionar lógica para redirecionar ou mostrar uma mensagem de sucesso
    } catch (error) {
      console.error('Erro ao adicionar carne:', error);
    }
  };

  // components/AdicionarCarne.js (com estilos Tailwind)
return (
  <div className="max-w-md mx-auto">
    <h1 className="text-2xl font-bold mb-4">Adicionar Carne</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium">{key.replace(/([A-Z])/g, ' $1')}: </label>
          <input
            type="number"
            name={key}
            value={value}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Adicionar Carne</button>
    </form>
  </div>
);

};

export default AdicionarCarne;
