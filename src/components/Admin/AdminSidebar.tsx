import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-6 text-center">XOX</div>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/dashboard" className="text-lg hover:text-gray-300">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
