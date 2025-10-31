const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const generateToken = (user) => {
return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || '7d',
});
};


exports.register = async (req, res) => {
try {
const { name, email, password, role } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: 'User already exists' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


const user = await User.create({ name, email, password: hashed, role: role || 'user' });
const token = generateToken(user);
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const token = generateToken(user);
res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};