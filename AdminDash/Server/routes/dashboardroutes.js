const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Password match (plain text for now — add bcrypt later)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.json({ message: "Login successful", user });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.get("/", (req, res) => {
    res.send("Dashboard Route Working");
});

module.exports = router;
