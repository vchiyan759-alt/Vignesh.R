const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const dashboardRoutes = require("./routes/dashboardroutes");

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Use routes
app.use("/", dashboardRoutes); // ✅ No /api prefix

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
