module.exports = mongoose => {
    var DepartmentSchema = mongoose.Schema({
        Name: String,
        Employees: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee"
        }]
    });

    DepartmentSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    return mongoose.model("Department", DepartmentSchema);
};