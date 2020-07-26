let config = require('config');
const winston = require('winston');
let ReadFileController = require('./read-file.controller');
let readFileController = new ReadFileController()

module.exports = class CurrencyController {
    constructor() {
    }

    async convertToLocalCurrencyByBranch(branch, currencyValue) {
        let currency = await this.getLocalCurrencyDetailsByABranch(branch);
        let localCurrencyValue = currencyValue * currency.rate;
        return {
            currency: localCurrencyValue,
            type: currency.type
        };
    }

    async getLocalCurrencyDetailsByABranch(branch) {
        let currencies = await this.getCurrencies();
        return currencies.filter(currency => {
            return currency.country == branch;
        })[0];
    }

    async getCurrencies() {
        return await readFileController.readCurrencies();
    }
}