let EmployeeService = require('../services/employee.service');
const employeeService = new EmployeeService();

let express = require('express');
let router = express.Router();

let config = require('config');

router.get(config.get('employee.route.getEmployeeByName'), function (req, res, next) {
    employeeService.getEmployeeByFirstName(req, res, next);
});

router.get(config.get('employee.route.salaryOfEmployee'), function (req, res, next) {
    employeeService.getSalaryOfAEmployee(req, res, next);
});

module.exports = function (app) {
    app.use(config.get('employee.route.base'), router);
};