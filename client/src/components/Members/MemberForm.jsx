// components/Members/MemberForm.jsx
import React, { useState, useEffect } from 'react';

const MemberForm = ({ formData, setFormData, onSubmit, isEditMode }) => {
  // Initialize form data for edit mode
  useEffect(() => {
    if (isEditMode) {
      setFormData(formData); // Set the form data if in edit mode
    }
  }, [isEditMode, formData, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h3>{isEditMode ? "Edit Member" : "Register a New Member"}</h3>
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          className="w-full p-3 border rounded-md"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          className="w-full p-3 border rounded-md"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Membership Expiry Date</label>
        <input
          type="date"
          name="membershipExpiryDate"
          className="w-full p-3 border rounded-md"
          value={formData.membershipExpiryDate.slice(0, 10) || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Membership Renewal Date</label>
        <input
          type="date"
          name="membershipRenewal"
          className="w-full p-3 border rounded-md"
          value={formData.membershipRenewal.slice(0, 10) || ''}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Annual Membership</label>
        <input
          type="text"
          name="annualMembership"
          className="w-full p-3 border rounded-md"
          value={formData.annualMembership}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Notes 1</label>
        <input
          type="text"
          name="notes1"
          className="w-full p-3 border rounded-md"
          value={formData.notes1}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Notes 2</label>
        <input
          type="text"
          name="notes2"
          className="w-full p-3 border rounded-md"
          value={formData.notes2}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Notes 3</label>
        <input
          type="text"
          name="notes3"
          className="w-full p-3 border rounded-md"
          value={formData.notes3}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Length (in months)</label>
        <input
          type="number"
          name="length"
          className="w-full p-3 border rounded-md"
          value={formData.length}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="w-full bg-maroon text-white py-3 rounded-md">
        {isEditMode ? "Update Member" : "Register Member"}
      </button>
    </form>
  );
};

export default MemberForm;

