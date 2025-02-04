import React from "react";

const MemberForm = ({ formData, setFormData, handleSubmit, editingMember }) => {
  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md">
      {["firstName", "lastName", "membershipExpiryDate", "membershipRenewal", "annualMembership", "notes1", "notes2", "notes3", "length"].map((field) => (
        <div key={field} className="mb-4">
          <label className="block text-gray-700 capitalize">{field.replace(/([A-Z])/g, " $1")}</label>
          <input
            type={field.includes("Date") || field.includes("Renewal") ? "date" : "text"}
            className="w-full p-3 border rounded-md"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
          />
        </div>
      ))}
      <button type="submit" className="w-full bg-maroon text-white py-3 rounded-md">
        {editingMember ? "Update Member" : "Register Member"}
      </button>
    </form>
  );
};

export default MemberForm;

