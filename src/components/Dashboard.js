import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ gastos }) => {
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroMes, setFiltroMes] = useState('todos');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    filtrarGastos(); // Atualiza a lista de gastos filtrados sempre que a lista de gastos ou filtro muda
  }, [gastos, filtroTipo, filtroMes]);

  const filtrarGastos = () => {
    const filtrados = gastos.filter((gasto) => {
      const mesGasto = new Date(gasto.data).getMonth(); // Obtem o mês do gasto (0-11)
      const mesFiltro = filtroMes === 'todos' ? null : parseInt(filtroMes);

      const tipoCondicao = filtroTipo === 'todos' || gasto.tipo === filtroTipo;
      const mesCondicao = mesFiltro === null || mesGasto === mesFiltro;

      return tipoCondicao && mesCondicao;
    });
    setGastosFiltrados(filtrados);
  };

  const meses = [
    { valor: 'todos', nome: 'Todos' },
    { valor: 0, nome: 'Janeiro' },
    { valor: 1, nome: 'Fevereiro' },
    { valor: 2, nome: 'Março' },
    { valor: 3, nome: 'Abril' },
    { valor: 4, nome: 'Maio' },
    { valor: 5, nome: 'Junho' },
    { valor: 6, nome: 'Julho' },
    { valor: 7, nome: 'Agosto' },
    { valor: 8, nome: 'Setembro' },
    { valor: 9, nome: 'Outubro' },
    { valor: 10, nome: 'Novembro' },
    { valor: 11, nome: 'Dezembro' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mt-6">Lista de Gastos</h2>
      <div className="mb-4 flex space-x-4">
        <div>
          <label htmlFor="filtroTipo" className="mr-2">Filtrar por Tipo:</label>
          <select
            id="filtroTipo"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="p-2 border"
          >
            <option value="todos">Todos</option>
            <option value="fixo">Fixo</option>
            <option value="variável">Variável</option>
          </select>
        </div>
        <div>
          <label htmlFor="filtroMes" className="mr-2">Filtrar por Mês:</label>
          <select
            id="filtroMes"
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="p-2 border"
          >
            {meses.map((mes) => (
              <option key={mes.valor} value={mes.valor}>
                {mes.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="mt-4">
        {gastosFiltrados.length > 0 ? (
          gastosFiltrados.map((gasto) => (
            <li key={gasto._id} className="border p-2 mb-2">
              <p>
                <strong>Data:</strong> {gasto.data} - <strong>Recebedor:</strong> {gasto.recebedor} -{' '}
                <strong>Valor:</strong> R$ {parseFloat(gasto.valor).toFixed(2)}
              </p>
              <p>
                <strong>Tipo:</strong> {gasto.tipo} - <strong>Subtítulo:</strong> {gasto.subtitulo}
              </p>
              <p>
                <strong>Unidade:</strong> {gasto.unidade} - <strong>Referência:</strong> {gasto.referencia}
              </p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Nenhum gasto encontrado para esse filtro.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
