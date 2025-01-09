import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // Import the context

const PrivateRoute = ({ children }) => {
    const { isLoggedin } = useContext(AppContext); // Get the isLoggedin state from context

    if (isLoggedin === null) {
        return <div>Loading...</div>; // Add a proper spinner here if needed
    }

    return isLoggedin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
