const db = require("../data");
const department = require("../data/models/department");

exports.list = (req, res) => {
    db.Employee.find()
    .populate("Department")
    .then(data => {
        res.render('employees/list', {
            employees: data,
            title: "Employee List",
            header: "Employee List"
        });
    })
    .catch(err => {
        handleError(err, res);
    });
};

exports.add = (req, res) => {
    db.Department.find()
    .then(data => {
        res.render('employees/add', {
            departments: data,
            title: "Add New Employee",
            header: "Add New Employee"
        });
    })
    .catch(err => {
        handleError(err, res);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const newEmployee = new db.Employee({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Department: {
            _id: req.body.DepartmentId
        }
    });
    
    newEmployee.save()
    .then(result => {
        db.Department.findOne({ _id: req.body.DepartmentId })
        .populate("Employees")
        .then(dept => {
            dept.Employees.push(result);
            dept.save()
            .then(result => {
                res.redirect('/employees')
            });
        });
    })
    .catch(err => {
        handleError(err, res);
    });
};

const handleError = (err, res) => {
    res.status(500).send({message: err.message});
}