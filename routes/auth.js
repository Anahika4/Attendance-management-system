const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/login', (req, res) => {
  console.log("BODY:", req.body);

  const { email, password } = req.body;

  const user = db
    .prepare('SELECT * FROM users WHERE email=? AND password=?')
    .get(email, password);

  console.log("USER:", user);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({
    user: {
      email: user.email,
      role: user.role
    }
  });
});


router.post('/add-faculty', (req, res) => {
  const { email, password } = req.body;

  try {
    db.prepare(`
      INSERT INTO users (email, password, role)
      VALUES (?, ?, 'faculty')
    `).run(email, password);

    res.json({ message: 'Faculty added successfully' });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});


router.post('/remove-user', (req, res) => {
  const { email } = req.body;

  const result = db
    .prepare(`DELETE FROM users WHERE email=?`)
    .run(email);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({ message: 'User removed successfully' });
});

module.exports = router;