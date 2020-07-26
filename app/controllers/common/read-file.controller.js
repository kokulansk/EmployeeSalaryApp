let config = require('config');
const winston = require('winston');
const csvParser = require('csv-parser');
const fs = require('fs');

const csv = require('csvtojson');

module.exports = class ReadFileController {

    constructor() {
    }

    async searchEmployeeByFirstName(firstName) {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'app/files/employee.csv';
            let employess = [];

            fs.createReadStream(csvFilePath).pipe(csvParser({ trim: true }))
                .on('data', (row) => {
                    if (row && Object.keys(row).length !== 0) {
                        let data = this.renameKeys({
                            'Employee Id': 'employeeId',
                            'Full Name': 'fullName',
                            "Gender": 'gender',
                            "Date of Birth": 'dateOfBirth',
                            "Joined Date": 'joinedDate',
                            "Salary (USD)": 'salary',
                            "Branch": 'branch',
                        },
                            row
                        );
                        if (data && data.fullName && data.fullName.split(" ")[0].toLowerCase().includes(firstName.toLowerCase())) {
                            employess.push(data);
                        }
                    }
                })
                .on('end', function () {
                    resolve(employess);
                });
        });
    }

    async readEmployeeDetails() {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'app/files/employee.csv';
            let employess = [];

            csv({ trim: true })
                .fromFile(csvFilePath)
                .then((data) => {
                    data.forEach(row => {
                        if (row && Object.keys(row).length !== 0) {
                            let data = this.renameKeys({
                                'Employee Id': 'employeeId',
                                'Full Name': 'fullName',
                                "Gender": 'gender',
                                "Date of Birth": 'dateOfBirth',
                                "Joined Date": 'joinedDate',
                                "Salary (USD)": 'salary',
                                "Branch": 'branch',
                            },
                                row
                            );
                            employess.push(data);
                        }
                    });
                    resolve(employess);
                })
        });
    }

    // Rename keys to standard format
    renameKeys(keysMap, obj) {
        return Object
            .keys(obj)
            .reduce((acc, key) => {
                const renamedObject = {
                    [keysMap[key.trimStart()] || key]: obj[key].trimStart()
                };
                return {
                    ...acc,
                    ...renamedObject
                }
            }, {});
    }

    async readCurrencies() {
        return new Promise((resolve, reject) => {
            const csvFilePath = 'app/files/currency.csv';
            let currencies = [];
            csv({ trim: true })
                .fromFile(csvFilePath)
                .then((data) => {
                    data.forEach(row => {
                        if (row && Object.keys(row).length !== 0) {
                            let data = this.renameKeys({
                                'Country': 'country',
                                'Type': 'type',
                                "Rate": 'rate'
                            },
                                row
                            );
                            currencies.push(data);
                        }
                        resolve(currencies);
                    });
                });
        });
    }
}