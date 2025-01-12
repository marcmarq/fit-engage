import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext"; // Access context for backend URL

const Dashboard = () => {
  const { backendUrl } = useContext(AppContext); // Access backend URL from AppContext
  const [membershipData, setMembershipData] = useState(null); // State for membership data
  const [loading, setLoading] = useState(true); // Loading state
  
  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/gym/membership`, {
          method: "GET",
          credentials: "include", // Include credentials (cookies)
        });

        if (response.ok) {
          const data = await response.json();
          setMembershipData(data); // Store membership data
        } else {
          console.error("Failed to fetch membership info");
        }
      } catch (error) {
        console.error("Error fetching membership info:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchMembershipData();
  }, [backendUrl]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (!membershipData) {
    return <div>No membership information found</div>; // Display message if no data is returned
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Membership Information</h3>
      <div>
        <p><strong>Name:</strong> {membershipData.firstName} {membershipData.lastName}</p>
        <p><strong>Membership Expiry:</strong> {membershipData.membershipExpiryDate}</p>
        <p><strong>Annual Membership:</strong> {membershipData.annualMembership ? "Yes" : "No"}</p>
        <p><strong>Notes:</strong> {membershipData.notes}</p>
      </div>
    </div>
  );
};

export default Dashboard;

