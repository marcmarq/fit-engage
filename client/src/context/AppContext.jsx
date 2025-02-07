import React, { createContext, useState, useEffect } from "react";

// Create context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(null); // Start with null to handle loading state
  const [userData, setUserData] = useState(null); // Store user data (name, email)
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback URL if not defined
  const [membershipData, setMembershipData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/data`, {
        method: "GET",
        credentials: "include", // Ensure cookies are included for session-based auth
      });

      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      if (data.success) {
        setUserData(data.userData);  // Update state with fetched user data
      } else {
        console.error("Error: ", data.message);
        setUserData(null); // Handle failure case
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null); // Clear user data on failure
    }
  };

  // Login method
  const login = async (username, password) => {
    try {
      const response = await fetch(`${backendUrl}/api/login`, {
        method: "POST",
        credentials: "include", // Ensure cookies are included
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setIsLoggedin(true); // Update login state
        await getUserData(); // Fetch user data immediately after login
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await fetch(`${backendUrl}/api/logout`, {
        method: "POST",
        credentials: "include", // Ensure cookies are included
      });

      setIsLoggedin(false); // Update login state
      setUserData(null); // Clear user data
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getMembershipData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership`, {
        method: "GET",
        credentials: "include", // Include session/cookie
      });

      if (!response.ok) {
        throw new Error('Failed to fetch membership data');
      }

      const data = await response.json();
      setMembershipData(data); // Store in state
    } catch (error) {
      console.error("Error fetching membership data:", error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/update-profile`, {
        method: "PUT", // Use PUT method for updating
        credentials: "include",
        body: JSON.stringify(profileData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setMembershipData(updatedProfile); // Update the local state with new profile
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Use Effect Hook for Member data
  useEffect(() => {
    if (isLoggedin === true) {
      getMembershipData();
    }
  }, []); // Run once on mount

  // Check login status on app initialization

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/check-session`, {
          method: "GET",
          credentials: "include", // Ensure cookies are included
        });
        const data = await response.json();

        if (data.loggedIn) { // <-- Corrected to match backend response
          setIsLoggedin(true);
          await getUserData(); // Fetch user data
        } else {
          setIsLoggedin(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedin(false);
      }
    };

    checkLoginStatus();
  }, []);


  return (
    <AppContext.Provider
      value={{
        backendUrl,
        setIsLoggedin,
        getUserData,
        setUserData,
        isLoggedin,
        userData,
        membershipData,
        getMembershipData,
        updateProfile,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
