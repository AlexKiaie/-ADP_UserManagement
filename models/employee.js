module.exports = mongoose => {
    var EmployeeSchema = mongoose.Schema({
        FirstName: String,
        LastName: String,
        Department: {
            type: mongoose.Schema.Types.Number,
            ref: "Department"
          }
    });

    EmployeeSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    return mongoose.model("Employee", EmployeeSchema);
};