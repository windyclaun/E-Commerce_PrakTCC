const db = require("../config/Database");

exports.createUser = (username, passwordHash, email, role) => {
  return db.execute(
    "INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)",
    [username, passwordHash, email, role]
  );
};

exports.findByUsername = (username) => {
  return db.execute("SELECT * FROM users WHERE username = ?", [username]);
};

exports.findById = (id) => {
  return db.execute(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [id]
  );
};

exports.getUserById = async (id) => {
  const [rows] = await db.execute(
    "SELECT id, username, email, role FROM users WHERE id = ?",
    [id]
  );
  return rows;
};

const db = require('../config/Database');

exports.createUser = (username, email, passwordHash) => {
  return db.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
    [username, email, passwordHash, 'customer']);
};

exports.findByUsername = (username) => {
  return db.execute('SELECT * FROM users WHERE username = ?', [username]);
};

exports.findById = (id) => {
  return db.execute('SELECT id, username, email, role FROM users WHERE id = ?', [id]);
};

exports.getUserById = async (id) => {
  const [rows] = await db.execute('SELECT id, username FROM users WHERE id = ?', [id]);
  return rows;
};