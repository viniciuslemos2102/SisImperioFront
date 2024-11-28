import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 text-white underline">Fechar</button>
    </div>
  );
};

export default Alert;
