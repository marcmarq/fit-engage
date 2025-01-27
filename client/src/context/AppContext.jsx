import React, { createContext, useState, useEffect } from "react";

// Create context
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isLoggedin, setIsLoggedin] = useState(null); // Start with null to handle loading state
  const [userData, setUserData] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback URL if not defined
  const [membershipData, setMembershipData] = useState(null);

  // Fetch user data from the backend
  const getUserData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/data`, {
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
  // Login method
  const login = async () => {
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

  // Use Effect Hooks

  // Use Effect Hook for Memeber data
  useEffect(() => {
    getMembershipData();
  }, []);


  // Check login status on app initialization
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/auth/check-session`, {
          method: "GET",
          credentials: "include", // Ensure cookies are included
        });
        const data = await response.json();
        if (data.isLoggedIn) {
          setIsLoggedin(true); // User is logged in
          await getUserData(); // Fetch user data
        } else {
          setIsLoggedin(false); // User is logged out
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedin(false); // Fallback to logged-out state
      }
    };

    checkLoginStatus();
  }, []); // Run only once on app load

    return (
    <AppContext.Provider
      value={{
        backendUrl,
        setIsLoggedin,
        getUserData,
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
