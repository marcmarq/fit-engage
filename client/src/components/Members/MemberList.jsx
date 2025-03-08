import React, { useState, useEffect, useRef } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
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
  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredMembers = membershipData
    .filter(
      (member) =>
        (member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (!filterType || member.membershipType === filterType)
    )
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.firstName.localeCompare(b.firstName)
        : b.firstName.localeCompare(a.firstName);
    });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-full mx-auto mt-6">
      <h1 className=" mb-px-20 text-3xl font-bold text-maroon text-center mb-6">Member Dashboard</h1>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handleRegister} className="bg-maroon text-white rounded-md px-4 py-2">
          Register
        </button>
        <div className="flex gap-4">
          <select className="p-2 border rounded-md" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Type1">Annual</option>
            <option value="Type2">Monthly</option>
            <option value="Type3">Walk-in</option>
          </select>
          <select className="p-2 border rounded-md" value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Sort Ascending</option>
            <option value="desc">Sort Descending</option>
          </select>
          <input type="text" placeholder="Search Members" className="p-2 border rounded-md" value={searchTerm} onChange={handleSearch} />
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div ref={formRef} className="bg-[#2C3E50] p-4 rounded-lg shadow-md max-w-md w-full mx-auto">
            <MemberForm formData={formData} setFormData={setFormData} onSubmit={(e) => { handleFormSubmit(e); setShowForm(false); }} isEditMode={isEditMode} />
          </div>
        </div>
      )}
      <div className="relative overflow-x-auto shadow-lg border border-gray-200 rounded-lg max-h-[510px] overflow-y-auto">
        <table className="w-full border-collapse text-sm table-fixed">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-center">
              <th className="p-2">Name</th>
              <th className="p-2">Membership Expiry</th>
              <th className="p-2">Membership Renewal</th>
              <th className="p-2">Annual Membership</th>
              <th className="p-2">Membership Type</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Length</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={index} className="border-b last:border-b-0 text-center">
                <td className="p-2 text-left">{member.firstName} {member.lastName}</td>
                <td className="p-2">{new Date(member.membershipExpiryDate).toLocaleDateString()}</td>
                <td className="p-2">{new Date(member.membershipRenewal).toLocaleDateString()}</td>
                <td className="p-2">{member.annualMembership}</td>
                <td className="p-2">{member.membershipType}</td>
                <td className="p-2">{member.notes1}</td>
                <td className="p-2">{member.length}</td>
                <td className="p-2 flex justify-center items-center">
                  <button onClick={() => handleEditClick(member)} className="text-yellow-500 text-sm mr-2">
                    <MdEdit size="1.5em" />
                  </button>
                  <button onClick={() => handleDelete(member)} className="text-red-500 text-sm">
                    <MdDelete size="1.5em" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;
