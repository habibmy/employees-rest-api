var express = require('express');
var router = express.Router();
const employees = require('../controller/employee.controller');

// Create a new Employee
router.post('/', employees.create);

// Retrieve all Employees
router.get('/', employees.findAll);

// Retrieve a single Employee with employeeId
router.get('/:employeeId', employees.findOne);

// Update a Employee with employeeId
router.put('/:employeeId', employees.update);

// Delete a Employee with employeeId
router.delete('/:employeeId', employees.delete);

// Retrieve all Employees with specific department
router.get('/department/:department', employees.findByDepartment);

module.exports = router;
