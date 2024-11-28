import React, { useState, useEffect } from 'react';

const meses = [
  { value: '', label: 'Selecione o mês' },
  { value: 'Janeiro', label: 'Janeiro' },
  { value: 'Fevereiro', label: 'Fevereiro' },
  { value: 'Março', label: 'Março' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Maio', label: 'Maio' },
  { value: 'Junho', label: 'Junho' },
  { value: 'Julho', label: 'Julho' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Setembro', label: 'Setembro' },
  { value: 'Outubro', label: 'Outubro' },
  { value: 'Novembro', label: 'Novembro' },
  { value: 'Dezembro', label: 'Dezembro' },
];

const GastosForm = ({ gasto, onSave, onClose }) => {
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const [recebedor, setRecebedor] = useState('');
  const [tipo, setTipo] = useState('variável');
  const [subtitulo, setSubtitulo] = useState('');
  const [unidade, setUnidade] = useState('');
  const [referencia, setReferencia] = useState('');

  // Carrega os dados do gasto atual para edição
  useEffect(() => {
    if (gasto) {
      setData(gasto.data ? new Date(gasto.data).toISOString().substring(0, 10) : '');
      setValor(gasto.valor || '');
      setRecebedor(gasto.recebedor || '');
      setTipo(gasto.tipo || 'variável');
      setSubtitulo(gasto.subtitulo || '');
      setUnidade(gasto.unidade || '');
      setReferencia(gasto.referencia || '');
    }
  }, [gasto]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoGasto = {
        data,
        valor: parseFloat(valor) || 0,  // Garantindo que valor seja numérico
        recebedor,
        tipo,
        subtitulo,
        unidade,
        referencia,
    };

    if (typeof onSave === 'function') {
        onSave(novoGasto);  // Executa a função de salvar
    } else {
        alert("Erro: Função de salvar não foi fornecida.");
    }

    // Reseta os campos do formulário
    setData('');
    setValor('');
    setRecebedor('');
    setTipo('variável');
    setSubtitulo('');
    setUnidade('');
    setReferencia('');
};

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">{gasto ? 'Editar Gasto' : 'Adicionar Gasto'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Data</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Valor</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Recebedor</label>
          <input
            type="text"
            value={recebedor}
            onChange={(e) => setRecebedor(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="border border-gray-300 p-2 w-full"
          >
            <option value="variável">Variável</option>
            <option value="fixo">Fixo</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Subtítulo</label>
          <input
            type="text"
            value={subtitulo}
            onChange={(e) => setSubtitulo(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Unidade</label>
          <select
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="">Selecione Unidade</option>
            <option value="Gastro">Gastro</option>
            <option value="Prime">Prime</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Referência</label>
          <select
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            className="border border-gray-300 p-2 w-full"
            required
          >
            {meses.map((mes) => (
              <option key={mes.value} value={mes.value}>
                {mes.label}
              </option>
            ))}
          </select>

        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {gasto ? 'Salvar' : 'Adicionar'}
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default GastosForm;
