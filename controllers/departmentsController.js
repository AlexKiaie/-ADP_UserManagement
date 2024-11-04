const db = require("../data");

exports.list = (req, res) => {
    db.Department.find()
    .then(data => {
        res.render('departments/list', {
            departments: data,
            title: "Departments",
            header: "Apollonia Dental Practice - Department List"
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employees."
        });
    });
};

exports.listWithEmployees = (req, res) => {
    db.Department.find()
    .populate("Employees")
    .then(data => {
        res.render('departments/employees', {
            departments: data,
            title: "Employees by Department",
            header: "Apollonia Dental Practice - Employees by Department"
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employees."
        });
    });
};