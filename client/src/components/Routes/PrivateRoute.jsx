import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedin } = useContext(AppContext);

  if (isLoggedin === null) {
    return <div>Loading...</div>; // Render a spinner or loader while state is being resolved
  }

  // Redirect logged-out users to the login page
  return isLoggedin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

