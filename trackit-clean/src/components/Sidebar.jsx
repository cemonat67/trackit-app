import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white fixed top-0 left-0 flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8">Menu</h2>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive ? "mb-4 text-blue-300" : "mb-4 hover:text-gray-300"
        }
      >
        Dashboard
      </NavLink>
      {/* Add more links as needed */}
    </div>
  );
};

export default Sidebar;