import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const useMembers = () => {
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
          const normalizedData = data.map((member) => ({
            firstName: member.firstName || "N/A",
            lastName: member.lastName || "N/A",
            membershipExpiryDate: member.membershipExpiryDate || "",
            membershipRenewal: member.membershipRenewal || "",
            annualMembership: member.annualMembership || "No",
            notes1: member.notes1 || "None",
            notes2: member.notes2 || "None",
            notes3: member.notes3 || "None",
            length: member.length || "N/A",
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

  const addMember = async (formData) => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const newMember = await response.json();
        setMembershipData([...membershipData, newMember]);
      } else {
        console.error("Failed to add new member");
      }
    } catch (error) {
      console.error("Error adding new member:", error);
    }
  };

  const updateMember = async (memberData, editingMember) => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...memberData,
          firstName: editingMember.firstName,
          lastName: editingMember.lastName,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const updatedMember = await response.json();
        setMembershipData(membershipData.map((m) =>
          m.firstName === updatedMember.firstName && m.lastName === updatedMember.lastName
            ? updatedMember
            : m
        ));
      } else {
        console.error("Failed to update member");
      }
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };

  const deleteMember = async (member) => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership`, {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: member.firstName, lastName: member.lastName }),
      });

      if (response.ok) {
        setMembershipData(membershipData.filter(m =>
          m.firstName !== member.firstName || m.lastName !== member.lastName
        ));
      } else {
        console.error("Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return {
    membershipData,
    loading,
    addMember,
    updateMember,
    deleteMember,
  };
};

export default useMembers;

