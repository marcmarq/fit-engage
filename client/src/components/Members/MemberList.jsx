// components/Members/MemberList.jsx
import React from 'react';

const MemberList = ({
  membershipData,
  searchTerm,
  setSearchTerm,
  handleEdit,
  handleDelete
}) => {
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMembers = membershipData.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h3>Search Members</h3>
      <input
        type="text"
        placeholder="Search by name"
        className="w-full p-3 border rounded-md mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />
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
          length
        } = member;

        const formattedExpiryDate = new Date(membershipExpiryDate).toLocaleDateString();
        const formattedRenewalDate = new Date(membershipRenewal).toLocaleDateString();

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

export default MemberList;

