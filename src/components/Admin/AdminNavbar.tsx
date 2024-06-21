import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="bg-white shadow-md flex items-center justify-between p-4">
      <div className="text-2xl font-bold">XOX</div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg py-2 px-4"
        />
      </div>
    </div>
  );
};

export default Navbar;
