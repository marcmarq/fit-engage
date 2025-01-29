import React, { useState, useEffect } from "react";
import { FaUsers, FaExclamationCircle, FaHourglass } from "react-icons/fa"; // Icons for the stats

const Dashboard = () => {
  const [membershipData, setMembershipData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [selectedStat, setSelectedStat] = useState(null); // Track which stat card was clicked
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"; // Fallback URL if not defined

  // Fetch all members data
  useEffect(() => {
    const fetchMembershipData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/gym/membership/all`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          // Normalize property names
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

          setMembershipData(normalizedData); // Set the membership data to state
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

  // Calculate dashboard stats (Total Members, Overdue Members, Expiring Soon)
  const calculateStats = (data) => {
    if (!data || data.length === 0) return;

    const today = new Date();
    const expiringSoonThreshold = 7; // Define the threshold for "expiring soon" (in days)

    // Calculate Total Members
    const totalMembers = data.length;

    // Calculate Overdue Members
    const overdueMembers = data.filter(member => {
      return new Date(member.membershipExpiryDate) < today &&
             (!member.membershipRenewal || new Date(member.membershipRenewal) < today);
    });

    // Calculate Membership Expiring Soon (within next 7 days)
    const expiringSoonMembers = data.filter(member => {
      return new Date(member.membershipExpiryDate) >= today &&
             new Date(member.membershipExpiryDate) < new Date(today.getTime() + expiringSoonThreshold * 24 * 60 * 60 * 1000); // Expiring within the next 7 days
    });

    // Set the calculated stats
    setDashboardStats({
      totalMembers,
      overdueMembers: overdueMembers.length,
      expiringSoonMembers: expiringSoonMembers.length,
    });

    // Store the actual member data for each category (overdue and expiring soon)
    setOverdueMembers(overdueMembers);
    setExpiringSoonMembers(expiringSoonMembers);
  };

  // Set state to store filtered lists of members
  const [overdueMembers, setOverdueMembers] = useState([]);
  const [expiringSoonMembers, setExpiringSoonMembers] = useState([]);

  // Calculate stats when membership data is fetched
  useEffect(() => {
    if (membershipData.length > 0) {
      calculateStats(membershipData); // Calculate stats once the data is fetched
    }
  }, [membershipData]); // Recalculate stats when membershipData changes

  if (loading) {
    return <div>Loading...</div>; // Loading state while stats are being calculated
  }

  if (membershipData.length === 0) {
    return <div>No membership information found</div>;
  }

  if (!dashboardStats) {
    return <div>Calculating statistics...</div>; // Show a message if stats haven't been calculated yet
  }

  // Handle clicks on stat cards
  const handleStatClick = (stat) => {
    setSelectedStat(stat); // Set selected stat (overdue or expiring soon)
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
          onClick={() => handleStatClick('total')}
        />
        <StatCard
          title="Overdue Members"
          value={dashboardStats.overdueMembers}
          icon={FaExclamationCircle}
          color="bg-red-100"
          onClick={() => handleStatClick('overdue')}
        />
        <StatCard
          title="Membership Expiring Soon"
          value={dashboardStats.expiringSoonMembers}
          icon={FaHourglass}
          color="bg-yellow-100"
          onClick={() => handleStatClick('expiringSoon')}
        />
      </div>

      {/* Display the list of members based on the selected stat */}
      <div className="mt-6">
        {selectedStat === "overdue" && (
          <MemberList members={overdueMembers} />
        )}
        {selectedStat === "expiringSoon" && (
          <MemberList members={expiringSoonMembers} />
        )}
      </div>
    </div>
  );
};

// StatCard component for displaying each statistic
const StatCard = ({ title, value, icon: Icon, color, onClick }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg ${color} cursor-pointer`}
      onClick={onClick}
    >
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

// MemberList component to display a list of members
const MemberList = ({ members }) => {
  return (
    <div className="space-y-4">
      {members.length === 0 ? (
        <div>No members found</div>
      ) : (
        members.map((member, index) => (
          <div key={index} className="border-b pb-2">
            <p><strong>Name:</strong> {`${member.firstName} ${member.lastName}`}</p>
            <p><strong>Membership Expiry Date:</strong> {new Date(member.membershipExpiryDate).toLocaleDateString()}</p>
            <p><strong>Membership Renewal Date:</strong> {member.membershipRenewal ? new Date(member.membershipRenewal).toLocaleDateString() : "N/A"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
