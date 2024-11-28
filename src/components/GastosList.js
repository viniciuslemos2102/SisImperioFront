// src/components/GastosList.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';
import GastosForm from './GastosForm'; // Importa o formulário para edição

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

const GastosList = ({ gastos, removerGasto, editarGasto }) => {
  const [selectedGasto, setSelectedGasto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const openEditGasto = (gasto) => {
    setSelectedGasto(gasto);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedGasto(null);
  };

  const handleEditGasto = async (gasto) => {
    const updatedGasto = await editarGasto(gasto);
    if (updatedGasto) {
      setIsAlertVisible(true);
      setTimeout(() => setIsAlertVisible(false), 3000); // Alerta desaparece após 3 segundos
    }
    closeModal(); // Fecha o modal após a edição
  };



  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Lista de Gastos</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-1/5">Data</th>
            <th className="border border-gray-300 p-2">Valor</th>
            <th className="border border-gray-300 p-2">Recebedor</th>
            <th className="border border-gray-300 p-2">Tipo</th>
            <th className="border border-gray-300 p-2">Subtítulo</th> {/* Adicionei a coluna Subtítulo */}
            <th className="border border-gray-300 p-2">Unidade</th> {/* Adicionei a coluna Unidade */}
            <th className="border border-gray-300 p-2">Referência</th> {/* Adicionei a coluna Referência */}
            <th className="border border-gray-300 p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((gasto) => (
            <tr key={gasto.id}>
              <td className="border border-gray-300 p-2 text-center">{new Date(gasto.data).toLocaleDateString()}</td>
              <td className="border border-gray-300 p-2 text-center">{gasto.valor.toFixed(2)}</td>
              <td className="border border-gray-300 p-2 text-center">{gasto.recebedor}</td>
              <td className="border border-gray-300 p-2 text-center">{gasto.tipo}</td>
              <td className="border border-gray-300 p-2 text-center">{gasto.subtitulo}</td> {/* Exibe o subtítulo */}
              <td className="border border-gray-300 p-2 text-center">{gasto.unidade}</td> {/* Exibe a unidade */}
              <td className="border border-gray-300 p-2 text-center">{gasto.referencia}</td> {/* Converte referência */}
              <td className="border border-gray-300 p-2">
                <div className="flex justify-center space-x-4">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => openEditGasto(gasto)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => removerGasto(gasto.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Exibe o modal se estiver visível */}
      {isModalVisible && (
        <GastosForm 
          gasto={selectedGasto} 
          onSave={handleEditGasto} 
          onClose={closeModal} 
        />
      )}

      {isAlertVisible && (
        <Alert message="Gasto atualizado com sucesso!" onClose={() => setIsAlertVisible(false)} />
      )}
    </div>
  );
};

export default GastosList;
