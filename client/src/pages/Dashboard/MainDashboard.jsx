import React, { useState } from "react";

const MainDashboard = () => {
  const [search, setSearch] = useState("");
  const members = [
    { name: "John Doe", datePaid: "01/15/2025", dateExpiry: "01/15/2026", status: "Active" },
    { name: "Jane Smith", datePaid: "05/25/2024", dateExpiry: "05/25/2025", status: "Pending" },
    { name: "Carlos Mendoza", datePaid: "08/10/2024", dateExpiry: "08/10/2025", status: "Active" },
    // Add more members as needed
  ];

  // Filter members based on search query
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 flex-1 p-8">
      {/* Welcome Banner */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-maroon">Welcome Banner, Admin Name</h1>
        <p className="text-gray-600 mt-4">A short introduction or overview text here.</p>
        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mt-6" />
      </div>

      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-maroon">Coaches</h3>
          <ul className="mt-4">
            <li className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span>Juan Dela Cruz</span>
            </li>
            <li className="flex items-center space-x-3 mt-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <span>Peter Parker</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-maroon">Revenue</h3>
          <div className="mt-4 flex justify-center items-center">
            <div className="w-20 h-20 bg-maroon text-white rounded-full flex justify-center items-center">
              84%
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-maroon">Calendar</h3>
          <div className="mt-4 bg-gray-300 h-32 rounded-lg"></div>
        </div>
      </div>

      {/* Active Members Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-maroon">Active Members</h3>
        <div className="mt-4 mb-4">
          <input
            type="text"
            className="w-full p-2 rounded-md border"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-gray-600">
              <th>Name</th>
              <th>Date Paid</th>
              <th>Date Expiry</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No members found</td>
              </tr>
            ) : (
              filteredMembers.map((member, index) => (
                <tr key={index}>
                  <td className="p-2">{member.name}</td>
                  <td className="p-2">{member.datePaid}</td>
                  <td className="p-2">{member.dateExpiry}</td>
                  <td className={`p-2 ${member.status === "Active" ? "text-green-500" : "text-yellow-500"}`}>
                    {member.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainDashboard;

