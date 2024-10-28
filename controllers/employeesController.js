const db = require("../data");
const department = require("../data/models/department");

exports.list = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    db.Employee.find(condition)
    .populate("Department")
    .then(data => {
        res.render('employee/list', {
            employees: data,
            title: "Employee List",
            header: "Employee List"
        });
    })
    .catch(err => {
        handleError(err, res);
    });
};

exports.byDepartment = (req, res) => {
    db.Employee.find()
    .populate("Department")
    .then(data => {
        var groupedByDepartment = data.reduce((rv, x) => {
            (rv[x.Department.Name] = rv[x.Department.Name] || []).push(x);
            return rv; 
        }, {});
        
        res.render('employee/byDepartment', {
            employeesByDepartment: groupedByDepartment,
            title: "Employee List By Deparment",
            header: "Employee List By Deparment"
        });
    })
    .catch(err => {
        handleError(err, res);
    });
};

exports.add = (req, res) => {
    db.Department.find()
    .then(data => {
        res.render('employee/add', {
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
    console.log(req.body);
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
        res.redirect('/employees')
    })
    .catch(err => {
        handleError(err, res);
    });
};

const handleError = (err, res) => {
    res.status(500).send({message: err.message});
}