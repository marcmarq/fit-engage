import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Members = () => {
  const { backendUrl } = useContext(AppContext);
  const [membershipData, setMembershipData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const [searchTerm, setSearchTerm] = useState(''); // State for search functionality
  const [editingMemberId, setEditingMemberId] = useState(null); // Track which member is being edited

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
            firstName: member["firstName"] || "N/A",
            lastName: member["lastName"] || "N/A",
            membershipExpiryDate: member["membershipExpiryDate"] || "",
            membershipRenewal: member["membershipRenewal"] || "",
            annualMembership: member["annualMembership"] || "No",
            notes1: member["notes1"] || "None",
            notes2: member["notes2"] || "None",
            notes3: member["notes3"] || "None",
            length: member["length"] || "N/A"
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

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (editingMemberId) {
//     // Update existing member
//     try {
//       const response = await fetch(`${backendUrl}/api/gym/membership/${editingMemberId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       if (response.ok) {
//         // Update the member data in state
//         setMembershipData(membershipData.map((member) =>
//           member.id === editingMemberId ? { ...member, ...formData } : member
//         ));
//         setEditingMemberId(null); // Reset editing mode
//         setFormData({ // Reset the form data
//           firstName: '',
//           lastName: '',
//           membershipExpiryDate: '',
//           membershipRenewal: '',
//           annualMembership: '',
//           notes1: '',
//           notes2: '',
//           notes3: '',
//           length: '',
//         });
//       } else {
//         console.error("Failed to update member");
//       }
//     } catch (error) {
//       console.error("Error updating member:", error);
//     }
//   } else {
//     // Add new member
//     try {
//       const response = await fetch(`${backendUrl}/api/gym/membership`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//         credentials: "include",
//       });

//       if (response.ok) {
//         const newMember = await response.json();
//         setMembershipData([...membershipData, newMember]); // Add the new member to state
//         setFormData({ // Reset form data after adding new member
//           firstName: '',
//           lastName: '',
//           membershipExpiryDate: '',
//           membershipRenewal: '',
//           annualMembership: '',
//           notes1: '',
//           notes2: '',
//           notes3: '',
//           length: '',
//         });
//       } else {
//         console.error("Failed to add new member");
//       }
//     } catch (error) {
//       console.error("Error adding new member:", error);
//     }
//   }
// };



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



  // // Handle the delete operation
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`${backendUrl}/api/gym/membership/${id}`, {
  //       method: 'DELETE',
  //       credentials: "include",
  //     });

  //     if (response.ok) {
  //       // Remove the deleted member from the state
  //       setMembershipData(membershipData.filter(member => member.id !== id));
  //     } else {
  //       console.error("Failed to delete member");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting member:", error);
  //   }
  // };


  // Handle the delete operation
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

      {/* Registration and Editing Form */}
      <h3>{editingMemberId ? "Edit Member" : "Register a New Member"}</h3>
      <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Membership Expiry Date</label>
          <input
            type="date"
            className="w-full p-3 border rounded-md"
            // Convert the ISODate to yyyy-MM-dd format
            value={formData.membershipExpiryDate ? formData.membershipExpiryDate.slice(0, 10) : ''}
            onChange={(e) =>
              setFormData({ ...formData, membershipExpiryDate: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Membership Renewal Date</label>
          <input
            type="date"
            className="w-full p-3 border rounded-md"
            // Convert the ISODate to yyyy-MM-dd format
            value={formData.membershipRenewal ? formData.membershipRenewal.slice(0, 10) : ''}
            onChange={(e) =>
              setFormData({ ...formData, membershipRenewal: e.target.value })
            }
            required
          />
        </div>




        <div className="mb-4">
          <label className="block text-gray-700">Annual Membership</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            value={formData.annualMembership}
            onChange={(e) => setFormData({ ...formData, annualMembership: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Notes 1</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            value={formData.notes1}
            onChange={(e) => setFormData({ ...formData, notes1: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Notes 2</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            value={formData.notes2}
            onChange={(e) => setFormData({ ...formData, notes2: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Notes 3</label>
          <input
            type="text"
            className="w-full p-3 border rounded-md"
            value={formData.notes3}
            onChange={(e) => setFormData({ ...formData, notes3: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Length (in months)</label>
          <input
            type="number"
            className="w-full p-3 border rounded-md"
            value={formData.length}
            onChange={(e) => setFormData({ ...formData, length: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="w-full bg-maroon text-white py-3 rounded-md">
          {editingMemberId ? "Update Member" : "Register Member"}
        </button>
      </form>

      {/* Search Input */}
      <h3>Search Members</h3>
      <input
        type="text"
        placeholder="Search by name"
        className="w-full p-3 border rounded-md mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* List of Members */}
      <h3>Membership Information</h3>
      {filteredMembers.map((member, index) => {
        const {
          firstName,
          lastName,
          membershipExpiryDate,
          membershipRenewal,
          annualMembership,
          notes1,
          notes2,
          notes3,
          length,
          id,
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
            <p><strong>Name:</strong> {firstName} {lastName}</p>
            <p><strong>Membership Expiry:</strong> {formattedExpiryDate}</p>
            <p><strong>Membership Renewal:</strong> {formattedRenewalDate}</p>
            <p><strong>Annual Membership:</strong> {annualMembership}</p>
            <p><strong>Notes 1:</strong> {notes1}</p>
            <p><strong>Notes 2:</strong> {notes2}</p>
            <p><strong>Notes 3:</strong> {notes3}</p>
            <p><strong>Length:</strong> {length}</p>


            {/* Edit and Delete Buttons */}
            <button
              onClick={() => handleEdit(member)} // Pass the full member object here for edit
              className="bg-yellow-500 text-white py-1 px-4 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(member)} // Pass the full member object here for delete
              className="bg-red-500 text-white py-1 px-4 rounded-md"
            >
              Delete
            </button>


          </div>
        );
      })}
    </div>
  );
};

export default Members;
