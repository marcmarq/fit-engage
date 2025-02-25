import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import MemberForm from './MemberForm';

const MemberList = ({
  membershipData,
  searchTerm,
  setSearchTerm,
  handleEdit,
  handleDelete,
  formData,
  setFormData,
  handleFormSubmit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formRef]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegister = () => {
    setIsEditMode(false);
    setShowForm(true);
    setFormData({
      firstName: '',
      lastName: '',
      membershipExpiryDate: '',
      membershipRenewal: '',
      membershipType: '',
      annualMembership: '',
      notes1: '',
      length: '',
    });
  };

  const handleEditClick = (member) => {
    setIsEditMode(true);
    setShowForm(true);
    setFormData(member);
  };

  const filteredMembers = membershipData.filter(
    (member) =>
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-full mx-auto mt-6" style={{ minHeight: '300px' }}>
      <h1 className="text-3xl font-bold text-maroon text-center">Member Dashboard</h1>
      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-4">Member List</h3>
        <input
          type="text"
          placeholder="Search Members"
          className="w-full p-3 border rounded-md mb-4"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          onClick={handleRegister}
          className="bg-maroon text-white py-2 px-4 rounded-md"
        >
          Register
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div ref={formRef} className="bg-[#2C3E50] p-4 rounded-lg shadow-md max-w-md w-full mx-auto">
            <MemberForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={(e) => {
                handleFormSubmit(e);
                setShowForm(false);
              }}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table
          className="w-full border-collapse text-sm"
          style={{ tableLayout: 'fixed' }}
        >
          <thead>
            <tr className="text-center">
              <th className="p-2" style={{ width: '150px' }}>Name</th>
              <th className="p-2" style={{ width: '150px' }}>Membership Expiry</th>
              <th className="p-2" style={{ width: '150px' }}>Membership Renewal</th>
              <th className="p-2" style={{ width: '150px' }}>Annual Membership</th>
              <th className="p-2" style={{ width: '150px' }}>Membership Type</th>
              <th className="p-2" style={{ width: '150px' }}>Notes</th>
              <th className="p-2" style={{ width: '50px' }}>Length</th>
              <th className="p-2" style={{ width: '50px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => {
              const {
                firstName,
                lastName,
                membershipExpiryDate,
                membershipRenewal,
                annualMembership,
                membershipType,
                notes1,
                length,
              } = member;

              const formattedExpiryDate = new Date(membershipExpiryDate).toLocaleDateString();
              const formattedRenewalDate = new Date(membershipRenewal).toLocaleDateString();

              return (
                <tr key={index} className="border-b last:border-b-0 text-center">
                  <td className="p-2 text-left" style={{ maxHeight: '50px', overflowY: 'auto' }}>{firstName} {lastName}</td>
                  <td className="p-2" style={{ maxHeight: '50px', overflowY: 'auto' }}>{formattedExpiryDate}</td>
                  <td className="p-2" style={{ maxHeight: '50px', overflowY: 'auto' }}>{formattedRenewalDate}</td>
                  <td className="p-2" style={{ maxHeight: '50px', overflowY: 'auto' }}>{annualMembership}</td>
                  <td className="p-2" style={{ maxHeight: '50px', overflowY: 'auto' }}>{membershipType}</td>
                  <td className="p-2" style={{ maxHeight: '50px', overflowY: 'auto' }}>{notes1}</td>
                  <td className="p-2" style={{ maxHeight: '50px', overflowY: 'auto' }}>{length}</td>
                  <td className="p-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <button
                      onClick={() => handleEditClick(member)}
                      className="text-yellow-500 text-sm mr-2"
                    >
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(member)}
                      className="text-red-500 text-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;
