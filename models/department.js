module.exports = mongoose => {
    var DepartmentSchema = mongoose.Schema({
        _id: Number,
        FirstName: String,
        LastName: String
    });

    DepartmentSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    return mongoose.model("Department", DepartmentSchema);
};