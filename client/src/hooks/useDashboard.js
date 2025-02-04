// src/hooks/useDashboard.js
import { useState, useEffect } from "react";
import { fetchMembershipData } from "../api/members";

const useDashboard = (backendUrl) => {
  const [membershipData, setMembershipData] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [overdueMembers, setOverdueMembers] = useState([]);
  const [expiringSoonMembers, setExpiringSoonMembers] = useState([]);

  useEffect(() => {
    const loadMembershipData = async () => {
      setLoading(true);
      const data = await fetchMembershipData(backendUrl);
      setMembershipData(data);
      setLoading(false);
    };

    loadMembershipData();
  }, [backendUrl]);

  useEffect(() => {
    if (membershipData.length > 0) {
      calculateStats(membershipData);
    }
  }, [membershipData]);

  const calculateStats = (data) => {
    if (!data || data.length === 0) return;

    const today = new Date();
    const expiringSoonThreshold = 7; // Define the threshold for "expiring soon" (in days)

    const totalMembers = data.length;
    const overdueMembers = data.filter(
      (member) =>
        new Date(member.membershipExpiryDate) < today &&
        (!member.membershipRenewal || new Date(member.membershipRenewal) < today)
    );
    const expiringSoonMembers = data.filter(
      (member) =>
        new Date(member.membershipExpiryDate) >= today &&
        new Date(member.membershipExpiryDate) <
          new Date(today.getTime() + expiringSoonThreshold * 24 * 60 * 60 * 1000)
    );

    setDashboardStats({
      totalMembers,
      overdueMembers: overdueMembers.length,
      expiringSoonMembers: expiringSoonMembers.length,
    });

    setOverdueMembers(overdueMembers);
    setExpiringSoonMembers(expiringSoonMembers);
  };

  return { membershipData, dashboardStats, loading, overdueMembers, expiringSoonMembers };
};

export default useDashboard;

