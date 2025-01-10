import React, { createContext, useState, useEffect } from "react";

// Create context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(null); // Start with null to handle loading state
  const [userData, setUserData] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback URL if not defined

  // Fetch user data from the backend
  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}api/user/data`, {
        method: "GET",
        credentials: "include", // Ensure cookies are included for session-based auth
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null); // Clear user data on failure
    }
  };

  // Check login status on app initialization
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLoginStatus = localStorage.getItem("isLoggedin");

        // Check if storedLoginStatus is 'true' or 'false'
        if (storedLoginStatus === "true") {
          setIsLoggedin(true); // User is logged in
          await getUserData(); // Fetch user data
        } else if (storedLoginStatus === "false") {
          setIsLoggedin(false); // User is logged out
        } else {
          // If no valid value is found, we assume not logged in (you should not store `null` in localStorage)
          setIsLoggedin(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedin(false); // Ensure fallback to logged-out state
      }
    };

    checkLoginStatus();
  }, []); // Run only once on app load

  // Login method
  const login = () => {
    setIsLoggedin(true); // Update login state
    localStorage.setItem("isLoggedin", true); // Persist true in localStorage
    getUserData(); // Fetch user data immediately after login
  };

  // Logout method
  const logout = () => {
    setIsLoggedin(false); // Update login state
    setUserData(null); // Clear user data
    localStorage.setItem("isLoggedin", false); // Persist false in localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        setIsLoggedin,
        getUserData,
        isLoggedin,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

