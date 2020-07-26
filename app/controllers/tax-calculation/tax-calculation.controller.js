module.exports = class TaxController {

    constructor() {
    }

    async sriLankaTaxCalculation(salary) {
        if (salary <= 100000) {
            return 0;
        }
        if (salary <= 249999.99) {
            return (salary * 5) / 100;
        }
        if (salary >= 250000) {
            return (salary * 10) / 100;
        }
    };

    async indiaTaxCalculation(salary) {
        if (salary <= 100000) {
            return 0;
        }
        if (salary <= 299999.99) {
            return (salary * 4) / 100;
        }
        if (salary >= 300000) {
            return (salary * 7) / 100;
        }
    };

    async pakistanTaxCalculation(salary) {
        if (salary <= 500000) {
            return (salary * 0.5) / 100;
        }
        if (salary > 500000) {
            return (salary * 4) / 100;
        }
    };

    async bangladeshTaxCalculation(salary) {
        return 0;
    };
}