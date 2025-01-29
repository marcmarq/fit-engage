// src/App.jsx
// import React from 'react';
import React from "react";
//import { AppContext } from "./context/AppContext";
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Sidebar from './components/Sidebar'; // Sidebar component
import Dashboard from './pages/Dashboard'; // Dashboard page
import AdminProfile from './pages/AdminProfile'; // AdminProfile page
import Payments from './pages/Payments'; // Payments page
import ViewMembers from './pages/ViewMembers'; // ViewMembers page
import PrivateRoute from './components/PrivateRoute'; // PrivateRoute component
import PublicRoute from './components/PublicRoute'; // PublicRoute component
import Home from './pages/Home'; // Home page
import Login from './pages/Login'; // Login page
import EmailVerify from './pages/EmailVerify'; // Email verification page
import ResetPassword from './pages/ResetPassword'; // Reset password page

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/email-verify"
          element={
            <PublicRoute>
              <EmailVerify />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        
        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <Dashboard />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <AdminProfile />
              </div>
            </PrivateRoute>
          }
        /> 
        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <Payments />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/members"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <ViewMembers />
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

