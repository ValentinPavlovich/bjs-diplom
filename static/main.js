// Дипломное задание к курсу «Основы JavaScript»
// Часть 1
class Profile {
    constructor({username, name: { firstName, lastName }, password}) {
        this.username = username;
        this.name = {firstName, lastName};
        this.password = password;     
    }

    // Метод 'Добавление нового пользователя'
    createUser (callback) {
        return ApiConnector.createUser({ username: this.username,  name: this.name, password: this.password }, (err, data) => {
            console.log(`Creating User: ${this.username}`);
            callback(err, data);
        });
    }

    // Метод 'Авторизация'
    performLogin (callback) {
        return ApiConnector.performLogin({ username: this.username, password: this.password }, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err, data);
        });
    }

    // Метод 'Добавление денег в личный кошелек'
    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    // Метод 'Конвертация валют'
    convertMoney ({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    // Метод 'Перевод токенов другому пользователю'
    transferMoney ({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfering ${amount} to ${to}`);
            callback(err, data);
        });
    }
}

// Функция получения курса валют с сервера
function getStocks (callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data);
    });
}