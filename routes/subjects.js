const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const subjects = db.prepare('SELECT * FROM subjects').all();
  res.json(subjects);
});

router.post('/', (req, res) => {
  const { name, faculty_email } = req.body;

  db.prepare(
    'INSERT INTO subjects (name, faculty_email) VALUES (?, ?)'
  ).run(name, faculty_email);

  res.json({ message: 'Subject added' });
});

module.exports = router;