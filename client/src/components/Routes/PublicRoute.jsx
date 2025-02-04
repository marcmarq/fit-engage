import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PublicRoute = ({ children }) => {
  const { isLoggedin } = useContext(AppContext);
console.log("PublicRoute - isLoggedin:", isLoggedin);
  if (isLoggedin === null) {
    return <div>Loading...</div>; // Render a spinner or loader while state is being resolved
  }

  // Redirect logged-in users to the dashboard
  return isLoggedin ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;

