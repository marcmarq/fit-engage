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

  // Handle submit opeartion
  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      ...formData,
      membershipExpiryDate: formData.membershipExpiryDate ? new Date(formData.membershipExpiryDate).toISOString() : null,
      membershipRenewal: formData.membershipRenewal ? new Date(formData.membershipRenewal).toISOString() : null,
    };

    if (editingMemberId) {
      // If editing, we need to send the full member object or any identifying details
      try {
        // Instead of using editingMemberId._id, use the full member object or its details (e.g., name)
        const response = await fetch(`${backendUrl}/api/gym/membership/edit`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...memberData,
            firstName: editingMemberId.firstName,
            lastName: editingMemberId.lastName,
          }), // Send identifying data along with the member data to find the member
          credentials: "include",
        });

        if (response.ok) {
          const updatedMember = await response.json(); // Get the updated member
          setMembershipData(membershipData.map((member) =>
            member.firstName === updatedMember.firstName && member.lastName === updatedMember.lastName
              ? updatedMember
              : member
          ));
          setEditingMemberId(null); // Reset editing mode
          setFormData({ // Reset the form data
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
        } else {
          console.error("Failed to update member");
        }
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      // Add new member
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
          const newMember = await response.json(); // Get the new member
          setMembershipData([...membershipData, newMember]); // Add the new member to state
          setFormData({ // Reset form data after adding new member
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
        } else {
          console.error("Failed to add new member");
        }
      } catch (error) {
        console.error("Error adding new member:", error);
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
        body: JSON.stringify(member), // Send member details for deletion
      });

      if (response.ok) {
        // Remove the deleted member from the state using the full details to match
        setMembershipData(membershipData.filter(existingMember => {
          return !(existingMember.firstName === member.firstName &&
                   existingMember.lastName === member.lastName &&
                   existingMember.membershipExpiryDate === member.membershipExpiryDate &&
                   existingMember.membershipRenewal === member.membershipRenewal &&
                   existingMember.annualMembership === member.annualMembership);
        }));
      } else {
        console.error("Failed to delete member");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Handle edit operation
  const handleEdit = (member) => {
    // Find the member from the current membership data based on full match
    const memberToEdit = membershipData.find(
      (m) =>
      m.firstName === member.firstName &&
        m.lastName === member.lastName &&
        m.membershipExpiryDate === member.membershipExpiryDate &&
        m.membershipRenewal === member.membershipRenewal
    );

    if (memberToEdit) {
      setEditingMemberId(memberToEdit);  // Set the full member object as the editing state
      setFormData({
        firstName: memberToEdit.firstName,
        lastName: memberToEdit.lastName,
        membershipExpiryDate: memberToEdit.membershipExpiryDate.slice(0, 10),
        membershipRenewal: memberToEdit.membershipRenewal.slice(0, 10),
        annualMembership: memberToEdit.annualMembership,
        notes1: memberToEdit.notes1,
        notes2: memberToEdit.notes2,
        notes3: memberToEdit.notes3,
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
      <h2>Member Dashboard</h2>

      {/* Member Form */}
      <MemberForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditMode={Boolean(editingMemberId)}
      />

      {/* Member List */}
      <MemberList
        membershipData={membershipData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );


};

export default Members;

