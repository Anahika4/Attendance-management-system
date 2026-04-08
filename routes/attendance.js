const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { student_id, subject_id, date, status } = req.body;

  db.prepare(`
    INSERT INTO attendance (student_id, subject_id, date, status)
    VALUES (?, ?, ?, ?)
    ON CONFLICT(student_id, subject_id, date)
    DO UPDATE SET status=excluded.status
  `).run(student_id, subject_id, date, status);

  res.json({ message: 'Attendance saved' });
});

router.get('/', (req, res) => {
  const data = db.prepare(`
    SELECT students.name, subjects.name as subject, date, status
    FROM attendance
    JOIN students ON students.id = attendance.student_id
    JOIN subjects ON subjects.id = attendance.subject_id
  `).all();

  res.json(data);
});
router.get('/:id', (req, res) => {
  const data = db.prepare(`
    SELECT subjects.name as subject, date, status
    FROM attendance
    JOIN subjects ON subjects.id = attendance.subject_id
    WHERE student_id = ?
  `).all(req.params.id);

  res.json(data);
});

module.exports = router;