import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      {/* Menu Button */}
      <button
        className="text-2xl lg:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      {/* Title */}
      <h2 className="text-xl font-semibold">Expense Tracker</h2>

      {/* Side Menu (Mobile View) */}
      {openSideMenu && (
        <div className="absolute top-16 left-0 w-64 h-screen bg-gray-700 z-50 shadow-lg">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
