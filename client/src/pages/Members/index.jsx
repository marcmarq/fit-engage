import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import MemberList from "../../components/Members/MemberList";
import useMembers from "../../hooks/useMembers";

const Members = () => {
  const { backendUrl } = useContext(AppContext);
  const {
    membershipData,
    setMembershipData,
    formData,
    setFormData,
    loading,
    searchTerm,
    setSearchTerm,
    editingMemberId,
    setEditingMemberId,
  } = useMembers();

  // Handle form submission (add or update member)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.membershipExpiryDate ||
      !formData.membershipRenewal ||
      !formData.membershipType ||
      !formData.length
    ) {
      console.error("Missing required fields");
      return;
    }

    // Prepare the payload
    const memberData = {
      ...formData,
      membershipExpiryDate: new Date(
        formData.membershipExpiryDate
      ).toISOString(),
      membershipRenewal: new Date(formData.membershipRenewal).toISOString(),
    };

    try {
      let response;
      if (editingMemberId) {
        // Update member
        response = await fetch(`${backendUrl}/api/gym/membership/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...memberData,
            _id: editingMemberId, // Include the _id for updates
          }),
          credentials: "include",
        });
      } else {
        // Add new member
        response = await fetch(`${backendUrl}/api/gym/membership`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(memberData),
          credentials: "include",
        });
      }

      if (response.ok) {
        const result = await response.json();
        if (editingMemberId) {
          // Update the member in the list
          setMembershipData(
            membershipData.map((member) =>
              member._id === result._id ? result : member
            )
          );
          setEditingMemberId(null); // Reset editing state
        } else {
          // Add the new member to the list
          setMembershipData([...membershipData, result]);
        }
        // Reset the form
        setFormData({
          firstName: "",
          lastName: "",
          membershipExpiryDate: "",
          membershipRenewal: "",
          membershipType: "",
          notes1: "",
          length: "",
        });
      } else {
        const errorResponse = await response.json();
        console.error("Error:", errorResponse);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (member) => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: member._id }),
        credentials: "include",
      });

      if (response.ok) {
        // Remove the member from the list
        setMembershipData(membershipData.filter((m) => m._id !== member._id));
      } else {
        const errorResponse = await response.json();
        console.error("Error:", errorResponse);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle edit operation
  // Handle edit operation
  const handleEdit = (member) => {
    setEditingMemberId(member._id); // Set the _id of the member being edited
    setFormData({
      firstName: member.firstName,
      lastName: member.lastName,
      membershipExpiryDate: member.membershipExpiryDate.slice(0, 10), // Format date for the input field
      membershipRenewal: member.membershipRenewal.slice(0, 10), // Format date for the input field
      membershipType: member.membershipType,
      notes1: member.notes1,
      length: member.length,
    });
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter members based on the search term
  const filteredMembers = membershipData.filter((member) =>
    `${member.firstName} ${member.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MemberList
        membershipData={filteredMembers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleSubmit}
      />
    </div>
  );
};

export default Members;
