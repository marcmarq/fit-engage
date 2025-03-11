import React, { useEffect, useCallback } from "react";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) => (
  <div className="mb-2">
    <label className="block text-gray-700 mb-1 text-sm">{label}</label>
    <input
      type={type}
      name={name}
      className="w-full p-2 border rounded-md text-sm"
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const MemberForm = ({ formData, setFormData, onSubmit, isEditMode }) => {
  useEffect(() => {
    if (isEditMode) {
      setFormData(formData); // Set the form data if in edit mode
    }
  }, [isEditMode, formData, setFormData]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    },
    [setFormData]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto"
    >
      <h3 className="text-xl font-bold mb-4">
        {isEditMode ? "Edit Member" : "Register a New Member"}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        <InputField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        <InputField
          label="Membership Expiry Date"
          name="membershipExpiryDate"
          type="date"
          value={formData.membershipExpiryDate.slice(0, 10) || ""}
          onChange={handleChange}
          required
        />
        <InputField
          label="Membership Renewal Date"
          name="membershipRenewal"
          type="date"
          value={formData.membershipRenewal.slice(0, 10) || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 mb-1 text-sm">
          Membership Type
        </label>
        <select
          name="membershipType"
          className="w-full p-2 border rounded-md text-sm"
          value={formData.membershipType}
          onChange={handleChange}
          required
        >
          <option value="">Select Membership Type</option>
          <option value="Annual">Annual</option>
          <option value="Monthly">Monthly</option>
          <option value="Walk-in">Walk-in</option>
        </select>
      </div>

      {formData.membershipType === "Annual" && (
        <InputField
          label="Annual Membership"
          name="annualMembership"
          value={formData.annualMembership}
          onChange={handleChange}
          required
        />
      )}

      <InputField
        label="Notes"
        name="notes1"
        value={formData.notes1}
        onChange={handleChange}
      />

      <InputField
        label="Length (in months)"
        name="length"
        type="number"
        value={formData.length}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-maroon text-white py-2 rounded-md"
      >
        {isEditMode ? "Update Member" : "Register Member"}
      </button>
    </form>
  );
};

export default MemberForm;
