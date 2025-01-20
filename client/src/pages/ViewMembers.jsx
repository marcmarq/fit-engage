import React, { useState } from 'react';

const ViewMembers = () => {
  const members = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Carlos Mendoza', email: 'carlos@example.com' },
    // Add more members here as needed
  ];

  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-maroon">View Members</h1>
      <p className="text-gray-600 mt-4">List of all members currently registered.</p>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-maroon">Members</h3>
        <table className="mt-4 w-full table-auto">
          <thead>
            <tr className="text-gray-600">
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr key={index}>
                <td className="p-2">{member.name}</td>
                <td className="p-2">{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMembers;

