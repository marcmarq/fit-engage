import React, { useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const payments = [
    { date: '2025-02-20', member: 'Emily Davis', amount: 250.00, type: 'Monthly', expiry: '2025-03-20' },
    { date: '2025-02-18', member: 'Alex Johnson', amount: 175.50, type: 'Annual', expiry: '2026-02-18' },
    { date: '2025-02-15', member: 'Sam Wilson', amount: 100.00, type: 'Walk-in', expiry: '2025-02-15' }
  ];

  const filteredPayments = payments
    .filter(payment => payment.member.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => sortOrder === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-gray-50 min-h-screen w-full flex flex-col items-center py-10">
      <div className="w-full max-w-7xl px-10">
        <h1 className="text-5xl font-extrabold text-maroon text-center mb-6">Payments</h1>
        <div className="flex justify-between items-center mb-6 p-4 bg-white shadow-lg rounded-lg">
          <StatCard title="Total Payments" value={filteredPayments.length} icon={FaMoneyBillWave} color="bg-blue-100 text-white" />
          <div className="flex gap-4">
            <select 
              className="p-3 border rounded-lg shadow-sm text-lg bg-white focus:outline-none focus:ring-2 focus:ring-maroon"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="desc">Most Recent</option>
              <option value="asc">Oldest First</option>
            </select>
            <input
              type="text"
              placeholder="Search by member name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 w-72 border rounded-lg shadow-sm text-lg bg-white focus:outline-none focus:ring-2 focus:ring-maroon"
            />
          </div>
        </div>
        <div className="bg-white p-8 w-full rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-maroon text-center mb-6">Recent Payments</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg shadow-md text-gray-700">
              <thead>
                <tr className="bg-maroon text-white">
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Member</th>
                  <th className="px-6 py-4 text-left">Amount (₱)</th>
                  <th className="px-6 py-4 text-left">Payment Type</th>
                  <th className="px-6 py-4 text-left">Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition">
                    <td className="px-6 py-4 font-bold">{payment.date}</td>
                    <td className="px-6 py-4">{payment.member}</td>
                    <td className="px-6 py-4 font-semibold">₱{payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">{payment.type}</td>
                    <td className="px-6 py-4">{payment.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`flex items-center p-4 rounded-lg shadow-md w-60 ${color}`}>
    <Icon className="text-4xl mr-4 text-maroon" />
    <div>
      <p className="text-sm font-medium text-black">{title}</p>
      <p className="text-xl font-bold text-black">{value}</p>
    </div>
  </div>
);

export default Payments;
