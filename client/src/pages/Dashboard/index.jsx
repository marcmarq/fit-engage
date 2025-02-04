import React, { useState } from "react";
import { FaUsers, FaExclamationCircle, FaHourglass } from "react-icons/fa";
import useDashboard from "../../hooks/useDashboard";

const Dashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const { membershipData, dashboardStats, loading, overdueMembers, expiringSoonMembers } = useDashboard(backendUrl);
  const [selectedStat, setSelectedStat] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (membershipData.length === 0) {
    return <div>No membership information found</div>;
  }

  if (!dashboardStats) {
    return <div>Calculating statistics...</div>;
  }

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Members"
          value={dashboardStats.totalMembers}
          icon={FaUsers}
          color="bg-blue-100"
          onClick={() => handleStatClick("total")}
        />
        <StatCard
          title="Overdue Members"
          value={dashboardStats.overdueMembers}
          icon={FaExclamationCircle}
          color="bg-red-100"
          onClick={() => handleStatClick("overdue")}
        />
        <StatCard
          title="Membership Expiring Soon"
          value={dashboardStats.expiringSoonMembers}
          icon={FaHourglass}
          color="bg-yellow-100"
          onClick={() => handleStatClick("expiringSoon")}
        />
      </div>

      <div className="mt-6">
        {selectedStat === "overdue" && <MemberList members={overdueMembers} />}
        {selectedStat === "expiringSoon" && <MemberList members={expiringSoonMembers} />}
      </div>
    </div>
  );
};

// StatCard component
const StatCard = ({ title, value, icon: Icon, color, onClick }) => {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${color} cursor-pointer`} onClick={onClick}>
      <div className="flex items-center">
        <Icon className="text-4xl mr-4" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

// MemberList component
const MemberList = ({ members }) => {
  return (
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
              {member.membershipRenewal ? new Date(member.membershipRenewal).toLocaleDateString() : "N/A"}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;

