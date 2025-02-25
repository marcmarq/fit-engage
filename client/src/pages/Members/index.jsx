import React, { useContext, useState } from 'react';
import { AppContext } from "../../context/AppContext";
import MemberForm from "../../components/Members/MemberForm";
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
    setEditingMemberId
  } = useMembers();

  // Handle submit operation
  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      ...formData,
      membershipExpiryDate: formData.membershipExpiryDate ? new Date(formData.membershipExpiryDate).toISOString() : null,
      membershipRenewal: formData.membershipRenewal ? new Date(formData.membershipRenewal).toISOString() : null,
    };

    if (editingMemberId) {
      try {
        const response = await fetch(`${backendUrl}/api/gym/membership/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...memberData,
            _id: editingMemberId, // Ensure _id is included
          }),
          credentials: "include",
        });

        if (response.ok) {
          const updatedMember = await response.json();
          setMembershipData(membershipData.map((member) =>
            member._id === updatedMember._id ? updatedMember : member
          ));
          setEditingMemberId(null);
          setFormData({
            firstName: '',
            lastName: '',
            membershipExpiryDate: '',
            membershipRenewal: '',
            annualMembership: '',
            membershipType: '',
            notes1: '',
            length: '',
          });
        } else {
          console.error("Failed to update member");
        }
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      // Add new member logic
      try {
        const response = await fetch(`${backendUrl}/api/gym/membership`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(memberData),
          credentials: "include",
        });

        if (response.ok) {
          const newMember = await response.json();
          setMembershipData([...membershipData, newMember]);
          setFormData({
            firstName: '',
            lastName: '',
            membershipExpiryDate: '',
            membershipRenewal: '',
            annualMembership: '',
            membershipType: '',
            notes1: '',
            length: '',
          });
        } else {
          console.error("Failed to add member");
        }
      } catch (error) {
        console.error("Error adding member:", error);
      }
    }
  };

  // Handle delete operation
  const handleDelete = async (member) => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: member._id }), // Send _id for deletion
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

  // Handle edit operation
  const handleEdit = (member) => {
    const memberToEdit = membershipData.find((m) => m._id === member._id); // Use _id to find the member

    if (memberToEdit) {
      setEditingMemberId(memberToEdit._id); // Set _id as the editing state
      setFormData({
        firstName: memberToEdit.firstName,
        lastName: memberToEdit.lastName,
        membershipExpiryDate: memberToEdit.membershipExpiryDate.slice(0, 10),
        membershipRenewal: memberToEdit.membershipRenewal.slice(0, 10),
        annualMembership: memberToEdit.annualMembership,
        membershipType: memberToEdit.membershipType,
        notes1: memberToEdit.notes1,
        length: memberToEdit.length,
      });
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the members based on the search term
  const filteredMembers = membershipData.filter((member) =>
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MemberList
        membershipData={membershipData}
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