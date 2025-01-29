import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const ViewMembers = () => {

  const { backendUrl } = useContext(AppContext);
  const [membershipData, setMembershipData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/gym/membership/all`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          // Normalize property names
          const normalizedData = data.map((member) => ({
            firstName: member["First Name"] || "N/A",
            lastName: member["Last Name"] || "N/A",
            membershipExpiryDate: member["Membership Expiry Date"] || "",
            membershipRenewal: member["Membership Renewal"] || "",
            annualMembership: member["Annual Membership"] || "No",
            notes1: member["Notes 1"] || "None",
            notes2: member["Notes 2"] || "None",
            notes3: member["Notes 3"] || "None",
          }));

          setMembershipData(normalizedData);
        } else {
          console.error("Failed to fetch membership info");
        }
      } catch (error) {
        console.error("Error fetching membership info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, [backendUrl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (membershipData.length === 0) {
    return <div>No membership information found</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Membership Information</h3>
      {membershipData.map((member, index) => {
        const {
          firstName,
          lastName,
          membershipExpiryDate,
          membershipRenewal,
          annualMembership,
          notes1,
          notes2,
          notes3,
        } = member;

        const formattedExpiryDate = membershipExpiryDate
          ? new Date(membershipExpiryDate).toLocaleDateString()
          : "Invalid Date";

        const formattedRenewalDate = membershipRenewal
          ? new Date(membershipRenewal).toLocaleDateString()
          : "Invalid Date";

        return (
          <div
            key={index}
            style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}
          >
            <p>
              <strong>Name:</strong> {firstName} {lastName}
            </p>
            <p>
              <strong>Membership Expiry:</strong> {formattedExpiryDate}
            </p>
            <p>
              <strong>Membership Renewal:</strong> {formattedRenewalDate}
            </p>
            <p>
              <strong>Annual Membership:</strong> {annualMembership}
            </p>
            <p>
              <strong>Notes 1:</strong> {notes1}
            </p>
            <p>
              <strong>Notes 2:</strong> {notes2}
            </p>
            <p>
              <strong>Notes 3:</strong> {notes3}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ViewMembers;

