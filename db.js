const Database = require('better-sqlite3');
const db = new Database(__dirname + '/database.db');


db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT
);

CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  department TEXT,
  year TEXT,
  gender TEXT,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS subjects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  faculty_email TEXT
);

CREATE TABLE IF NOT EXISTS attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT,
  subject_id INTEGER,
  date TEXT,
  status TEXT,
  UNIQUE(student_id, subject_id, date)
);
`);



const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c;

if (userCount === 0) {
  db.prepare('INSERT INTO users (email,password,role) VALUES (?,?,?)')
    .run('admin@mail.com', '1234', 'admin');

  db.prepare('INSERT INTO users (email,password,role) VALUES (?,?,?)')
    .run('faculty@mail.com', '1234', 'faculty');

  db.prepare('INSERT INTO users (email,password,role) VALUES (?,?,?)')
    .run('student@mail.com', '1234', 'student');
}


const students = [
  ['S1', 'John Doe', 'john@mail.com', 'CSE', '3', 'Male', '9999999991'],
  ['S2', 'Alice Smith', 'alice@mail.com', 'ECE', '2', 'Female', '9999999992'],
  ['S3', 'Rahul Sharma', 'rahul@mail.com', 'CSE', '4', 'Male', '9999999993'],
  ['S4', 'Priya Verma', 'priya@mail.com', 'IT', '1', 'Female', '9999999994'],
  ['S5', 'Arjun Singh', 'arjun@mail.com', 'ME', '3', 'Male', '9999999995']
];

students.forEach(s => {
  const exists = db.prepare("SELECT * FROM students WHERE id=?").get(s[0]);
  if (!exists) {
    db.prepare(`
      INSERT INTO students (id, name, email, department, year, gender, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(...s);
  }
});


const subjects = [
  ['Mathematics', 'faculty@mail.com'],
  ['Physics', 'faculty@mail.com'],
  ['Computer Science', 'faculty@mail.com'],
  ['Electronics', 'faculty@mail.com']
];

subjects.forEach(sub => {
  const exists = db.prepare("SELECT * FROM subjects WHERE name=?").get(sub[0]);
  if (!exists) {
    db.prepare(`
      INSERT INTO subjects (name, faculty_email)
      VALUES (?, ?)
    `).run(...sub);
  }
});


const attendance = [
  ['S1', 1, '2026-04-01', 'Present'],
  ['S1', 2, '2026-04-01', 'Absent'],
  ['S2', 1, '2026-04-01', 'Present'],
  ['S3', 3, '2026-04-02', 'Present']
];

attendance.forEach(a => {
  const exists = db.prepare(`
    SELECT * FROM attendance
    WHERE student_id=? AND subject_id=? AND date=?
  `).get(a[0], a[1], a[2]);

  if (!exists) {
    db.prepare(`
      INSERT INTO attendance (student_id, subject_id, date, status)
      VALUES (?, ?, ?, ?)
    `).run(...a);
  }
});


module.exports = db;