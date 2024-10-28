const express = require("express");
const db = require("./data/index.js");
const config = require("./config.js");

const employeesController = require("./controllers/employeesController.js");
const departmentsController = require("./controllers/departmentsController");

const app = express();

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/employees", employeesController.list);

app.get("/employees/add", employeesController.add);

app.post("/employees/create", employeesController.create);

app.get("/departments", departmentsController.list);

app.get("/departments/employees", departmentsController.listWithEmployees);

const PORT = process.env.PORT || 8080;

db.mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });