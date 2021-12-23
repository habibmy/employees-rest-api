const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
    name: String,
    gender: String,
    age: Number,
    designation: String,
    department: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Employees', EmployeeSchema);