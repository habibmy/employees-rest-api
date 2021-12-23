const Employee = require('../models/employee.model');

//Create new Employee
exports.create = (req, res) => {
    // Request validation
    if (!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Create a Employee
    const employee = new Employee({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        designation: req.body.designation,
        department: req.body.department
    });

    // Save Employee in the database
    employee.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the employee details."
            });
        });
};

// Retrieve all employees from the database.
exports.findAll = (req, res) => {
    Employee.find()
        .then(employees => {
            res.send(employees);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving employees."
            });
        });
};

// Find a single employee with a employeeId
exports.findOne = (req, res) => {
    Employee.findById(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving employee with id " + req.params.employeeId
            });
        });
};

// Update a employee
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Employee content can not be empty"
        });
    }

    // Find and update employee with the request body
    Employee.findByIdAndUpdate(req.params.employeeId, {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        designation: req.body.designation,
        department: req.body.department
    }, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating employee with id " + req.params.employeeId
            });
        });
};

// Delete a employee with the specified employeeId in the request
exports.delete = (req, res) => {
    Employee.findByIdAndRemove(req.params.employeeId)
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            res.send({ message: "Employee deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
            return res.status(500).send({
                message: "Could not delete employee with id " + req.params.employeeId
            });
        });
};

// Find employee with a department
exports.findByDepartment = (req, res) => {
    Employee.find({ department: req.params.department })
        .then(result => {
            return res.json(result)
        })
}