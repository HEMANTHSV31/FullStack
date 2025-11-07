const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// app.use(cors(({
//   origin: "http://localhost:5173", credentials: true
// })));
app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3105",
  database: "demo",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to database.");
  }
});

app.post("/add_users", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name,email,password) values (?,?,?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting student:", err);
      res.status(500).send("Error inserting student");
    } else {
      res.status(200).send("Student added successfully");
    }
  });
});

app.get("/users", (req, res) => {
  const sql = "SELECT * from users";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching students:", err);
      res.status(500).send("Error fetching students");
    } else {
      res.status(200).json(result);
    }
  });
});

app.put("/update_user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const sql = "UPDATE users SET name=?, email=?, password=? WHERE id=?";
  db.query(sql, [name, email, password, id], (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      res.status(500).send("Error updating student");
    } else {
      res.status(200).send("Student updated successfully");
    }
  });
});

app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      res.status(500).send("Error deleting student");
    } else {
      res.status(200).send("Student deleted successfully");
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
