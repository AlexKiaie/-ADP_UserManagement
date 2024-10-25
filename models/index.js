const config = require("../config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.Employee = require("./employee.js")(mongoose);
db.Department = require("./department.js")(mongoose);

db.mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

module.exports = db;
