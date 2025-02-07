// src/api/members.js

export const fetchMembershipData = async (backendUrl) => {
  try {
    const response = await fetch(`${backendUrl}/api/gym/membership/all`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch membership info");
    }

    const data = await response.json();

    // Normalize property names
    return data.map((member) => ({
      firstName: member["firstName"] || "N/A",
      lastName: member["lastName"] || "N/A",
      membershipExpiryDate: member["membershipExpiryDate"] || "",
      membershipRenewal: member["membershipRenewal"] || "",
      annualMembership: member["annualMembership"] || "No",
      notes1: member["notes1"] || "None",
      notes2: member["notes2"] || "None",
      notes3: member["notes3"] || "None",
    }));
  } catch (error) {
    console.error("Error fetching membership info:", error);
    return [];
  }
};

