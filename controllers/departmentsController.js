const db = require("../data");

exports.list = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    db.Department.find(condition)
    .then(data => {
        res.render('departments', {
            departments: data,
            title: "Departments",
            header: "Department List"
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving employees."
        });
    });
}