import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaClipboardList, FaDollarSign, FaUsers } from 'react-icons/fa'; // Icons for the sidebar
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';  // Assuming AppContext is where `setIsLoggedin` is defined

const Sidebar = () => {
  const navigate = useNavigate();
  const { setIsLoggedin } = useContext(AppContext);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedin(false);  // Set logged-in state to false
    navigate('/login');    // Redirect to login page
  };

  return (
    <div className="bg-maroon text-white w-64 min-h-screen p-5">
      {/* Admin Profile Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3" />
        <p className="font-semibold">Admin Name</p>
        <p className="text-sm">admin@example.com</p>
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
            <FaUsers className="inline-block mr-2" /> View Members
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

