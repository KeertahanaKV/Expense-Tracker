import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gray-800 h-full text-white flex flex-col p-4">
      {/* Profile Image */}
      <div className="flex justify-center mb-6">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center text-xl font-bold">
            {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu-${index}`}
            onClick={() => handleClick(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
              activeMenu === item.label
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
