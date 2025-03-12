import Payment from "../models/Payment.js"; // Import the Payment model

// Calculate monthly revenue
export const getMonthlyRevenue = async (req, res) => {
  try {
    // Fetch all payments
    const payments = await Payment.find();

    // Calculate monthly revenue
    const monthlyRevenue = payments.reduce((acc, payment) => {
      const month = new Date(payment.date).toLocaleString("default", {
        month: "short",
      });
      acc[month] = (acc[month] || 0) + payment.amount;
      return acc;
    }, {});

    // Initialize revenueData with all months
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const revenueData = allMonths.map((month) => ({
      month,
      revenue: monthlyRevenue[month] || 0,
    }));

    res.status(200).json(revenueData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching revenue data", error: error.message });
  }
};
