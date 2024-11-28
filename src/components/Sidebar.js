// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>
      <ul>
        <li className="mb-2">
          <Link to="/" className="hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/add" className="hover:text-gray-400">Adicionar Gasto</Link>
        </li>
        <li className="mb-2">
          <Link to="/adicionar-carne" className="hover:text-gray-400">Adicionar Carne</Link> {/* Nova funcionalidade */}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
