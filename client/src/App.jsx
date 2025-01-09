// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Assuming you use react-toastify for ToastContainer
import Sidebar from './components/Sidebar'; // Import Sidebar
import MainDashboard from './pages/Dashboard/MainDashboard';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';  // Replace with your actual Home component
import Login from './pages/Login';  // Replace with your actual Login component
import EmailVerify from './pages/EmailVerify';  // Replace with your actual EmailVerify component
import ResetPassword from './pages/ResetPassword';  // Replace with your actual ResetPassword component

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Private Route with Sidebar */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar /> {/* Sidebar should be included here */}
                <MainDashboard />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

