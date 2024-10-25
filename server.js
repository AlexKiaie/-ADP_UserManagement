const express = require("express");
const db = require("./models");

const app = express();

app.get("/employees", (req, res) => {
    // res.json({ message: "Welcome to Apollonia Dental Practice employee management." });
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  db.Employee.find(condition)
    .populate("Department")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
});

app.get("/departments", (req, res) => {
  // res.json({ message: "Welcome to Apollonia Dental Practice employee management." });
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  db.Department.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees."
      });
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});