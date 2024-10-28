const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.Employee = require("./models/employee.js")(mongoose);
db.Department = require("./models/department.js")(mongoose);

module.exports = db;
