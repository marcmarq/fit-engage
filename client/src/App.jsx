import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainDashboard from './pages/Dashboard/MainDashboard'

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
          path="/registration"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <Registration />
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

