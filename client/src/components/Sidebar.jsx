import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt } from 'react-icons/fa'; // Icons for the sidebar

const Sidebar = () => {
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
          <Link to="/members" className="block py-2 px-4 hover:bg-gray-700 rounded">
            View Members
          </Link>
        </li>
        <li>
          <Link to="/login" className="block py-2 px-4 hover:bg-gray-700 rounded">
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
