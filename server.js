const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use('/auth', require('./routes/auth'));
app.use('/students', require('./routes/students'));
app.use('/attendance', require('./routes/attendance'));
app.use('/subjects', require('./routes/subjects'));


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});