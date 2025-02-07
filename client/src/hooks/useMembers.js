import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const useMembers = () => {
  const { backendUrl } = useContext(AppContext);
  const [membershipData, setMembershipData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
  const [editingMemberId, setEditingMemberId] = useState(null); // Track which member is being edited

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    membershipExpiryDate: '',
    membershipRenewal: '',
    annualMembership: '',
    notes1: '',
    notes2: '',
    notes3: '',
    length: '',
  });



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
            _id: member._id, // Ensure _id is included
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
        _id: editingMember._id, // Send _id instead of firstName and lastName
      }),
      credentials: "include",
    });

    if (response.ok) {
      const updatedMember = await response.json();
      setMembershipData(membershipData.map((m) =>
        m._id === updatedMember._id ? updatedMember : m
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
      body: JSON.stringify({ _id: member._id }), // Send _id instead of firstName and lastName
    });

    if (response.ok) {
      setMembershipData(membershipData.filter(m => m._id !== member._id));
    } else {
      console.error("Failed to delete member");
    }
  } catch (error) {
    console.error("Error deleting member:", error);
  }
};

  return {
    membershipData,
    setMembershipData,
    formData,
    setFormData,
    loading,
    searchTerm,
    setSearchTerm,
    editingMemberId,
    setEditingMemberId,
    addMember,
    updateMember,
    deleteMember,
  };
};

export default useMembers;
