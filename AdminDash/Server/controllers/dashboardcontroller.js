exports.getDashboardData = async (req, res) => {
  try {
    // Example static dashboard values
    // You can replace this with DB metrics later
    const data = {
      usersCount: 150,
      totalSales: 2300,
      totalViews: 12000,
      salesGraph: [200, 400, 300, 500, 600, 700], // example array for chart.js
      usersGraph: [5, 10, 6, 9, 12, 15],
      viewsGraph: [200, 500, 400, 700, 800, 1000]
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Dashboard data fetch failed" });
  }
};
