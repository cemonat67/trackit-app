import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-white shadow-md flex items-center px-6 justify-between">
      <div className="text-xl font-bold text-gray-800">TrackIt Admin</div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="text-sm text-white bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;