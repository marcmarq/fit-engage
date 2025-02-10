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
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
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
          setDashboardStats({
            totalMembers: normalizedData.length,
            overdueMembers: normalizedData.filter(
              (m) => new Date(m.membershipExpiryDate) < new Date()
            ).length,
            expiringSoonMembers: normalizedData.filter((m) => {
              const expiryDate = new Date(m.membershipExpiryDate);
              const today = new Date();
              return (
                expiryDate >= today &&
                expiryDate < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
              );
            }).length,
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

    fetchMembershipData();
  }, [backendUrl]);

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setShowPopup(true);
  };

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6000 },
    { month: "Jun", revenue: 8000 },
  ];

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
        />
        <StatCard
          title="Overdue Members"
          value={dashboardStats?.overdueMembers || 0}
          icon={FaExclamationCircle}
          onClick={() => handleStatClick("overdue")}
        />
        <StatCard
          title="Membership Expiring Soon"
          value={dashboardStats?.expiringSoonMembers || 0}
          icon={FaHourglass}
          onClick={() => handleStatClick("expiringSoon")}
        />
      </div>
      <div className="mt-8 bg-white shadow-lg p-6 rounded-lg w-full">
        <h2 className="text-center text-xl font-semibold mb-4 text-red-950">Monthly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
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
            <div className="overflow-y-auto max-h-96 p-2 border rounded-lg scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
              {selectedStat === "overdue" && (
                <MemberList
                  members={membershipData.filter(
                    (m) => new Date(m.membershipExpiryDate) < new Date()
                  )}
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
                        new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                    );
                  })}
                />
              )}
              {selectedStat === "total" && (
                <MemberList members={membershipData} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};


const StatCard = ({ title, value, icon: Icon, onClick }) => {
  return (
    <div
      className="flex items-center justify-between w-full h-36 p-6 rounded-lg bg-gray-100 cursor-pointer shadow-md hover:shadow-lg transition"
      onClick={onClick}
    >
      <div className="flex items-center">
        <Icon className="text-5xl mr-6 text-red-900" />
        <div>
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

const MemberList = ({ members }) => (
  <div className="space-y-4">
    {members.length === 0 ? (
      <div>No members found</div>
    ) : (
      members.map((member, index) => (
        <div key={index} className="border-b pb-2">
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
      ))
    )}
  </div>
);

export default Dashboard;
