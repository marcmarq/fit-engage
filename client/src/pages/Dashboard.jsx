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
  const [showDropdown, setShowDropdown] = useState(null);
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
    if (stat !== "total") {
      setSelectedStat(stat);
      setShowPopup(true);
      setSearchQuery("");
    }
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
                />
              )}
              {selectedStat === "total" && (
                <MemberList
                  members={membershipData.filter((m) =>
                    `${m.firstName} ${m.lastName}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )}
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

const MemberList = ({ members }) => (
  <div className="space-y-4">
    {members.length === 0 ? (
      <div>No members found</div>
    ) : (
      members.map((member, index) => (
        <div
          key={index}
          className="border-b pb-2 flex justify-between items-center"
        >
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
          <div className="relative">
            <select
              className="text-green-700 font-bold px-6 py-3 text-lg cursor-pointer w-50 border border-gray-300 rounded-md"
              onChange={(e) => console.log(`Selected: ${e.target.value}`)}
              defaultValue=""
            >
              <option
                value=""
                disabled
                hidden
                className="text-gray-400 font-bold"
              >
                Select Payment
              </option>
              <option
                value="annual"
                className="text-yellow-600 font-bold text-lg py-3"
              >
                Annual
              </option>
              <option
                value="monthly"
                className="text-gray-600 font-bold text-lg py-3"
              >
                Monthly
              </option>
              <option
                value="session"
                className="text-orange-600 font-bold text-lg py-3"
              >
                Session
              </option>
            </select>
          </div>
        </div>
      ))
    )}
  </div>
);

export default Dashboard;
