module.exports = (app) => {
    const employeesController = require("./controllers/employeesController.js");
    const departmentsController = require("./controllers/departmentsController");

    app.get("/", (req, res) => {
        res.render('index', {header: "ADP Home"});
    });

    app.get("/employees", employeesController.list);

    app.get("/employees/add", employeesController.add);

    app.post("/employees/create", employeesController.create);

    app.get("/departments", departmentsController.list);

    app.get("/departments/employees", departmentsController.listWithEmployees);
}