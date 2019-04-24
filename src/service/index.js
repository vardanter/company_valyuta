const initialData = {
    companies: [
        {
            name: "Company 1",
            id: 1,
            currencyData: [
                { key: 1, value: 66 },
                { key: 2, value: 86 }
            ]
        },
        {
            name: "Company 2",
            id: 2,
            currencyData: [
                { key: 1, value: 66 },
                { key: 2, value: 86 }
            ]
        }
    ],
    currencies: [
        {id: 1, name: 'Доллар'},
        {id: 2, name: 'Фунт Стерлинг'}
    ]
};

const storageKey = 'companiesAndCurrencies';

class StoreService {

    getData = () => {
        const data = JSON.parse(localStorage.getItem(storageKey));
        
        return data ? data : initialData;
    }

    getCompanies = () => {
        const data = this.getData();
        const { companies } = data;
        return companies;
    }

    getCompany = (id) => {
        const companies = this.getCompanies();
        return companies.find(company => company.id == id);
    }

    addCompany = (company, id = 0) => {
        const data = this.getData();
        const companies = this.getCompanies();
        let _company = company;

        if (id) {
            _company.id = id;
        } else {
            _company.id = this.generateCompanyId();
        } 

        const filteredCompanies = companies.filter(item => item.id !== _company.id);
        const newList = [_company].concat(filteredCompanies);
        const newData = Object.assign(data, {companies: newList});
        
        localStorage.setItem(storageKey, JSON.stringify(newData));
    }

    deleteCompany = (id) => {
        const data = this.getData();
        const companies = this.getCompanies();
        const filteredCompanies = companies.filter(item => item.id !== id);
        const newData = Object.assign(data, {companies: filteredCompanies});

        localStorage.setItem(storageKey, JSON.stringify(newData));
    }

    getCurrencies = () => {
        const data = this.getData();
        const { currencies } = data;
        return currencies;
    }

    getCurrency = (id) => {
        const currencies = this.getCurrencies();
        return currencies.find(currency => currency.id == id);
    }

    addCurrency = (currency, id) => {
        const data = this.getData();
        const currencies = this.getCurrencies();

        if (id) {
            currency.id = id;
        } else {
            currency.id = this.generateCurrencyId();
        }

        const filteredCurrencies = currencies.filter(item => item.id !== id);
        const newList = [currency].concat(filteredCurrencies);
        const newData = Object.assign(data, {currencies: newList});
        
        localStorage.setItem(storageKey, JSON.stringify(newData));
    }

    deleteCurrency = (id) => {
        const data = this.getData();
        const currencies = this.getCurrencies();
        const filteredCurrencies = currencies.filter(item => item.id !== id);
        const newData = Object.assign(data, {currencies: filteredCurrencies});

        localStorage.setItem(storageKey, JSON.stringify(newData));
    }

    generateCompanyId = () => {
        const companies = this.getCompanies();
        let maxId = 0;

        companies.forEach(element => {
            if (element.id > maxId) {
                maxId = element.id;
            }
        });
        maxId++;
        return maxId;
    }

    generateCurrencyId = () => {
        const currencies = this.getCurrencies();
        let maxId = 0;

        currencies.forEach(element => {
            if (element.id > maxId) {
                maxId = element.id;
            }
        });
        maxId++;
        return maxId;
    }
}

export default StoreService;