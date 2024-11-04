const db = require("../data");
const department = require("../data/models/department");

exports.list = (req, res) => {
    db.Employee.find()
    .populate("Department")
    .then(data => {
        res.render('employees/list', {
            employees: data,
            title: "Employees",
            header: "Apollonia Dental Practice - Employees"
        });
    })
    .catch(err => {
        handleError(res, err);
    });
};

exports.add = (req, res) => {
    db.Department.find()
    .then(data => {
        res.render('employees/add', {
            departments: data,
            title: "Add New Employee",
            header: "Apollonia Dental Practice - Add New Employee"
        });
    })
    .catch(err => {
        handleError(res, err);
    });
};

exports.create = (req, res) => {
    if (!req.body) {
        handleError(res, {message: "No data provided to create employee!"}, 400);
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
        handleError(res, err);
    });
};

const handleError = (res, err, code = 500) => {
    res.status(code).send({message: err.message});
}