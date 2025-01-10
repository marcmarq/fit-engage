import React from 'react';

const AdminProfile = () => {
  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-maroon">Admin Profile</h1>
      <p className="text-gray-600 mt-4">Here you can view and edit your profile details.</p>

      {/* Profile Information */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-maroon">Personal Information</h3>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <p className="text-gray-700">Name: Admin Name</p>
          <p className="text-gray-700">Email: admin@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

