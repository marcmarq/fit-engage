import React, { useState, useEffect } from "react";
import { FaUsers, FaExclamationCircle, FaHourglass } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStat, setSelectedStat] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [revenueData, setRevenueData] = useState([
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: 0 },
    { month: "Jul", revenue: 0 },
    { month: "Aug", revenue: 0 },
    { month: "Sep", revenue: 0 },
    { month: "Oct", revenue: 0 },
    { month: "Nov", revenue: 0 },
    { month: "Dec", revenue: 0 },
  ]);
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Fetch membership data
  const fetchMembershipData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/gym/membership/all`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const normalizedData = data.map((member) => ({
          firstName: member["firstName"] || "N/A",
          lastName: member["lastName"] || "N/A",
          membershipExpiryDate: member["membershipExpiryDate"] || "",
          membershipRenewal: member["membershipRenewal"] || "",
          annualMembership: member["annualMembership"] || "No",
          notes1: member["notes1"] || "None",
          notes2: member["notes2"] || "None",
          notes3: member["notes3"] || "None",
        }));
        setMembershipData(normalizedData);

        // Calculate stats
        const today = new Date();
        const overdueMembers = normalizedData.filter(
          (m) => new Date(m.membershipExpiryDate) < today
        ).length;
        const expiringSoonMembers = normalizedData.filter((m) => {
          const expiryDate = new Date(m.membershipExpiryDate);
          return (
            expiryDate >= today &&
            expiryDate < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          );
        }).length;

        setDashboardStats({
          totalMembers: normalizedData.length,
          overdueMembers,
          expiringSoonMembers,
        });
      } else {
        console.error("Failed to fetch membership info");
      }
    } catch (error) {
      console.error("Error fetching membership info:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch revenue data
  const fetchRevenueData = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/revenue/monthly-revenue`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRevenueData(data);
      } else {
        console.error("Failed to fetch revenue info");
      }
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  // Fetch all data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchMembershipData();
      await fetchRevenueData();
    };

    fetchData();
  }, [backendUrl]);

  const handleStatClick = (stat) => {
    if (stat !== "total") {
      setSelectedStat(stat);
      setShowPopup(true);
      setSearchQuery("");
    }
  };

  const handleAddPayment = async (member, paymentType) => {
    if (!paymentType) {
      alert("Please select a membership type before adding payment.");
      return;
    }

    const amount =
      paymentType === "annual" ? 1200 : paymentType === "monthly" ? 1500 : 250;

    // Calculate the expiry date based on the payment type
    const expiryDate = new Date();
    if (paymentType === "annual") {
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Add 1 month for annual payments
    } else if (paymentType === "monthly") {
      expiryDate.setMonth(expiryDate.getMonth() + 1); // Add 1 month for monthly payments
    } else if (paymentType === "walk-in") {
      expiryDate.setDate(expiryDate.getDate() + 1); // Add 1 day for walk-in payments
    }

    const paymentData = {
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
      member: `${member.firstName} ${member.lastName}`,
      amount: amount,
      type: paymentType,
      expiry: expiryDate.toISOString().split("T")[0], // Expiry date in YYYY-MM-DD format
    };

    try {
      // Step 1: Add the payment
      const paymentResponse = await fetch(
        `${backendUrl}/api/payments/payments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(paymentData),
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("Failed to add payment");
      }

      // Step 2: Update the member's status in the backend
      const updateResponse = await fetch(
        `${backendUrl}/api/update-membership/update-membership`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName: member.firstName,
            lastName: member.lastName,
            membershipExpiryDate: expiryDate.toISOString().split("T")[0],
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update member status");
      }

      // Step 3: Remove the member from the list
      setMembershipData((prevData) =>
        prevData.filter(
          (m) =>
            m.firstName !== member.firstName || m.lastName !== member.lastName
        )
      );

      // Step 4: Fetch updated revenue data
      await fetchRevenueData();

      alert("Payment added successfully!");
    } catch (error) {
      console.error("Error adding payment:", error);
      alert("Failed to add payment. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-4xl font-bold mb-4 text-red-950">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Members"
          value={dashboardStats?.totalMembers || 0}
          icon={FaUsers}
          onClick={() => handleStatClick("total")}
          bgColor="bg-gray-100"
          loading={loading}
        />
        <StatCard
          title="Overdue Members"
          value={dashboardStats?.overdueMembers || 0}
          icon={FaExclamationCircle}
          onClick={() => handleStatClick("overdue")}
          loading={loading}
        />
        <StatCard
          title="Membership Expiring Soon"
          value={dashboardStats?.expiringSoonMembers || 0}
          icon={FaHourglass}
          onClick={() => handleStatClick("expiringSoon")}
          loading={loading}
        />
      </div>
      <div className="mt-8 bg-white shadow-lg p-6 rounded-lg w-full">
        <h2 className="text-center text-xl font-semibold mb-4 text-red-950">
          Monthly Revenue
        </h2>
        <ResponsiveContainer width="100%" height={290}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#AA0000"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg h-3/4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Member List</h2>
            <input
              type="text"
              placeholder="Search Member"
              className="w-full p-2 border rounded mb-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="overflow-y-auto max-h-96 p-2 border rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {selectedStat === "overdue" && (
                <MemberList
                  members={membershipData.filter(
                    (m) =>
                      new Date(m.membershipExpiryDate) < new Date() &&
                      `${m.firstName} ${m.lastName}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                  )}
                  onAddPayment={handleAddPayment}
                />
              )}
              {selectedStat === "expiringSoon" && (
                <MemberList
                  members={membershipData.filter((m) => {
                    const expiryDate = new Date(m.membershipExpiryDate);
                    const today = new Date();
                    return (
                      expiryDate >= today &&
                      expiryDate <
                        new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) &&
                      `${m.firstName} ${m.lastName}`
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    );
                  })}
                  onAddPayment={handleAddPayment}
                />
              )}
              {selectedStat === "total" && (
                <MemberList
                  members={membershipData.filter((m) =>
                    `${m.firstName} ${m.lastName}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )}
                  onAddPayment={handleAddPayment}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, onClick, bgColor, loading }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-lg shadow-md cursor-pointer ${
        bgColor || "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <Icon className="text-4xl text-red-900" />
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-4 border-gray-300 border-t-red-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MemberList = ({ members, onAddPayment }) => {
  return (
    <div className="space-y-4">
      {members.length === 0 ? (
        <div>No members found</div>
      ) : (
        members.map((member, index) => (
          <MemberItem key={index} member={member} onAddPayment={onAddPayment} />
        ))
      )}
    </div>
  );
};

const MemberItem = ({ member, onAddPayment }) => {
  const [selectedPaymentType, setSelectedPaymentType] = useState("");

  return (
    <div className="border-b pb-2 flex justify-between items-center">
      <div>
        <p>
          <strong>Name:</strong> {`${member.firstName} ${member.lastName}`}
        </p>
        <p>
          <strong>Membership Expiry Date:</strong>{" "}
          {new Date(member.membershipExpiryDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Membership Renewal Date:</strong>{" "}
          {member.membershipRenewal
            ? new Date(member.membershipRenewal).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
      <div className="relative flex flex-col gap-4 mt-6">
        <select
          className="w-full px-4 py-3 border rounded text-gray-700 bg-white shadow-sm text-lg font-semibold focus:ring focus:ring-blue-300"
          onChange={(e) => setSelectedPaymentType(e.target.value)}
          value={selectedPaymentType}
        >
          <option value="" disabled>
            Select Payment
          </option>
          <option value="annual">Annual</option>
          <option value="monthly">Monthly</option>
          <option value="walk-in">Walk-in</option>
        </select>
        <button
          className="w-full px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-green-700 transition-all duration-300"
          onClick={() => onAddPayment(member, selectedPaymentType)}
        >
          Add Payment
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
