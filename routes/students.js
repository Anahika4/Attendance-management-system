const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const students = db.prepare('SELECT * FROM students').all();
  res.json(students);
});

router.post('/', (req, res) => {
  const { id, name, email, department, year, gender } = req.body;

  if (!id || !name || !email) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  db.prepare(
    'INSERT INTO students (id, name, email, department, year, gender) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(id, name, email, department, year, gender);

  res.json({ message: 'Student added' });
});

module.exports = router;