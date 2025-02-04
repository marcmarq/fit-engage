import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaSignOutAlt, FaDollarSign, FaUsers } from "react-icons/fa";
import useUserData from "../../hooks/useUsersData";  // Custom hook for user data
import useLogout from "../../hooks/useLogout.js";  // Custom hook for logout

const Sidebar = () => {
  const userData = useUserData();  // Get user data from custom hook
  const handleLogout = useLogout();  // Get the logout function from custom hook

  return (
    <div className="bg-maroon text-white w-64 min-h-screen p-5">
      {/* Admin Profile Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3" />
        <p className="font-semibold">{userData ? userData.name : "Admin Name"}</p>
        <p className="text-sm">{userData ? userData.email : "admin@example.com"}</p>
      </div>

      {/* Navigation Menu */}
      <ul>
        <li>
          <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            <FaHome className="inline-block mr-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" className="block py-2 px-4 hover:bg-gray-700 rounded">
            <FaUser className="inline-block mr-2" /> Admin Profile
          </Link>
        </li>
        <li>
          <Link to="/payments" className="block py-2 px-4 hover:bg-gray-700 rounded">
            <FaDollarSign className="inline-block mr-2" /> Payments
          </Link>
        </li>
        <li>
          <Link to="/members" className="block py-2 px-4 hover:bg-gray-700 rounded">
            <FaUsers className="inline-block mr-2" /> Members
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mt-10">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-700 rounded text-white font-semibold"
        >
          <FaSignOutAlt className="inline-block mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

