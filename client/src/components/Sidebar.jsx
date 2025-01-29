import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaDollarSign, FaUsers } from 'react-icons/fa';
import { AppContext } from '../context/AppContext';  // Import the AppContext

const Sidebar = () => {
  const navigate = useNavigate();
  const { setIsLoggedin, setUserData, userData, getUserData } = useContext(AppContext);  // Access context data and methods

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedin(false);  // Set logged-in state to false
    navigate('/login');    // Redirect to login page
  };

  // Log the user data to check if it's accessible
  useEffect(() => {
    console.log('Sidebar userData:', userData); // Log the userData on sidebar render

    if (!userData) {  // Only fetch user data if it's not already available
      getUserData(); // Fetch user data when the component mounts
    }
  }, [getUserData, userData]); // Dependency array ensures it runs only when needed

  return (
    <div className="bg-maroon text-white w-64 min-h-screen p-5">
      {/* Admin Profile Section */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-3" />
        <p className="font-semibold">{userData ? userData.name : 'Admin Name'}</p> {/* Admin Name */}
        <p className="text-sm">{userData ? userData.email : 'admin@example.com'}</p> {/* Admin Email */}
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

