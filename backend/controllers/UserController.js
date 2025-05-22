const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

// REGISTER
exports.register = async (req, res) => {
  console.log("Register endpoint hit"); // Tambahkan ini
  console.log("Register data:", req.body); // Log data yang diterima frontend
  const { username, password, email, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    // Urutan: username, passwordHash, email, role
    await User.createUser(username, hashed, email, role);
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const [user] = await User.findByUsername(username);
    if (!user.length)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user[0].id, username: user[0].username, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USER BY ID
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.getUserById(id);
    if (!user.length)
      return res.status(404).json({ message: "User not found" });
    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
