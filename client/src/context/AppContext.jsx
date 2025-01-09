import React, { createContext, useState, useEffect } from "react";

// Create context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback URL if not defined

  // Fetch user data from the backend
  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}api/user/data`, {
        method: 'GET',
        credentials: 'include', // Ensure cookies are included for session-based auth
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Check login status on component mount (optional, depends on your logic)
  useEffect(() => {
    const checkLoginStatus = async () => {
      // Simulate checking login status (you may need to fetch some login status here)
      if (isLoggedin) {
        await getUserData(); // Load user data if logged in
      }
    };
    checkLoginStatus();
  }, [isLoggedin]);

  return (
    <AppContext.Provider value={{ backendUrl, setIsLoggedin, getUserData, isLoggedin, userData }}>
      {children}
    </AppContext.Provider>
  );
};

