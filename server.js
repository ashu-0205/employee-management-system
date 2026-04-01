const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee'
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// CREATE
app.post('/employees', (req, res) => {
  const { name, salary } = req.body;
  db.query('INSERT INTO employees (name, salary) VALUES (?, ?)',
    [name, salary],
    err => {
      if (err) throw err;
      res.send("Added");
    });
});

// READ
app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// UPDATE
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  db.query('UPDATE employees SET name=?, salary=? WHERE id=?',
    [name, salary, id],
    err => {
      if (err) throw err;
      res.send("Updated");
    });
});

// DELETE
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM employees WHERE id=?', [id],
    err => {
      if (err) throw err;
      res.send("Deleted");
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));