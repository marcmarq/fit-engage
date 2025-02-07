import React from 'react';

const Payments = () => {
  return (
    <div className="bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-maroon">Payments</h1>
      <p className="text-gray-600 mt-4">Manage and process member payments here.</p>

      {/* Payment Details Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-maroon">Recent Payments</h3>
        <div className="mt-4">
          <p className="text-gray-700">No recent payments yet.</p>
        </div>
      </div>
    </div>
  );
};

export default Payments;

