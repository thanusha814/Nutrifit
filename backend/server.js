const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend (optional)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'TS333MT.10814', // Update if you have a password
  database: 'nutrifit'
});

db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Register API
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;  // Fixed from 'username' to 'name'

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ message: 'Error registering', error: err });
    }
    res.status(200).json({ message: 'Registered successfully' });
  });
});

// Login API
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ message: 'Error logging in', error: err });
    }

    if (results.length > 0) {
      res.status(200).json({ message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

// Food Order API
app.post('/order', (req, res) => {
  const { food, name, contact, address, landmark } = req.body;

  if (!food || !name || !contact || !address || !landmark) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO orders (food, name, contact, address, landmark) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [food, name, contact, address, landmark], (err, result) => {
    if (err) {
      console.error('Order error:', err);
      return res.status(500).json({ message: 'Order placement failed', error: err });
    }

    console.log('Order placed:', { food, name, contact, address, landmark });
    res.status(200).json({ message: 'Order placed successfully' });
  });
});

// Food Delivery API
app.post('/api/food_delivery', (req, res) => {
  const { recipe_id, delivery_address, delivery_date } = req.body;
  const query = `INSERT INTO food_delivery (recipe_id, delivery_address, delivery_date) 
                 VALUES (?, ?, ?)`;
  db.query(query, [recipe_id, delivery_address, delivery_date], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT})');
});