import React from 'react';

const Menu = ({ setCurrentPage }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-white hover:underline"
          >
            Dashboard
          </button>
        </li>
        <li>
          <button
            onClick={() => setCurrentPage('create')}
            className="text-white hover:underline"
          >
            Criar Novo Gasto
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
