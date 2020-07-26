'use strict';
let config = require('config');
const winston = require('winston');
let EmployeeController = require('../controllers/employee.controller');
let employeeController = new EmployeeController();
let errorCode = require('../constants/response-code.constant');

module.exports = class EmployeeService {
    constructor() {
    }

    async getEmployeeByFirstName(req, res, next) {
        let name = req.params.name;

        if (!name) {
            let responseData = {
                'success': false,
                'responseCode': errorCode.badRequest.responseCode,
                'errorMessage': errorCode.badRequest.message + ' Please send the employee first name in the endpoint'
            };
            res.status(errorCode.badRequest.responseCode).send(responseData);
            return;
        }
        try {
            let response = await employeeController.getEmployeeByFirstName(name);
            if (response.success) {
                res.status(errorCode.success.responseCode).send(response);
                return;
            }

            res.status(errorCode.badRequest .responseCode).send(response);
        } catch (err) {
            winston.error('EmployeeService - getEmployeeByFirstName');
            winston.error(err);
            res.status(errorCode.serverError.responseCode).send(err);
        }
    }

    async getSalaryOfAEmployee(req, res, next) {
        let employeeId = req.params.employeeId;

        if (!employeeId) {
            let responseData = {
                'success': false,
                'responseCode': errorCode.badRequest.responseCode,
                'errorMessage': errorCode.badRequest.message + ' Please send the employeeId in the endpoint'
            };
            res.status(errorCode.badRequest.responseCode).send(responseData);
            return;
        }
        try {
            let response = await employeeController.getSalaryOfAEmployee(employeeId);
            if (response.success) {
                res.status(errorCode.success.responseCode).send(response);
                return;
            }

            res.status(errorCode.badRequest .responseCode).send(response);
        } catch (err) {
            winston.error('EmployeeService - getSalaryOfAEmployee');
            winston.error(err);
            res.status(errorCode.serverError.responseCode).send(err);
        }
    }
};