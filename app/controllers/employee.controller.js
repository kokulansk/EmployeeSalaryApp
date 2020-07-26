let config = require('config');
let errorCode = require('../constants/response-code.constant');
const winston = require('winston');
let ReadFileController = require('./common/read-file.controller');
let readFileController = new ReadFileController();

let CurrencyController = require('./common/currency.controller');
let currencyController = new CurrencyController();

let TaxController = require('./tax-calculation/tax-calculation.controller');
let taxController = new TaxController();

module.exports = class EmployeeController {

    constructor() {
    }

    async getEmployeeByFirstName(firstName) {
        let employess = await readFileController.searchEmployeeByFirstName(firstName);

        return {
            'success': true,
            'message': 'Employee found',
            'data': employess
        };
    }

    async getSalaryOfAEmployee(employeeId) {
        let employeeData = await this.getEmployeeDetailsById(employeeId);
        if (!employeeData) {
            return {
                'success': false,
                'message': 'Invalid Employee no'
            };
        }

        let salaryDetails = await this.getEmployeeLocalSalary(employeeData.branch, employeeData.salary);
        employeeData.salary = salaryDetails.type + ": " + salaryDetails.currency;
        let taxAmount = await this.getEmployeePaidTaxAmount(employeeData.branch, salaryDetails.currency);
        employeeData.pateTaxAmount = salaryDetails.type + ": " + taxAmount;
        employeeData.netPayAmount = salaryDetails.type + ": " + (salaryDetails.currency - taxAmount);

        return {
            'success': true,
            'message': 'Employee found',
            'data': employeeData
        };
    }

    async getEmployeePaidTaxAmount(branch, salary) {
        switch (branch) {
            case 'Sri Lanka':
                return taxController.sriLankaTaxCalculation(salary);
            case 'India':
                return taxController.indiaTaxCalculation(salary);
            case 'Pakistan':
                return taxController.pakistanTaxCalculation(salary);
            case 'Bangladesh':
                return taxController.bangladeshTaxCalculation(salary);
        }
    }

    async getEmployeeLocalSalary(branch, salary) {
        return await currencyController.convertToLocalCurrencyByBranch(branch, salary);
    }

    async getEmployeeDetailsById(employeeId) {
        let employess = await this.getEmployeeDetails();

        return employess.filter(employee => {
            return employee.employeeId == employeeId
        })[0];
    }

    async getEmployeeDetails() {
        return await readFileController.readEmployeeDetails();
    }

}