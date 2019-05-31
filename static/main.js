// Дипломное задание к курсу «Основы JavaScript»

// Часть 1
class Profile {
    constructor({username, name: { firstName, lastName }, password}) {
        this.username = username;
        this.name = {firstName, lastName};
        this.password = password;     
    }

    // Метод 'Добавление нового пользователя'
    createUser(callback) {
        return ApiConnector.createUser({ username: this.username,  name: this.name, password: this.password }, (err, data) => {
            console.log(`Creating user ${this.username}`);            
            callback(err, data);
        });
    }

    // Метод 'Авторизация'
    performLogin(callback) {
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
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    // Метод 'Перевод токенов другому пользователю'
    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`);
            callback(err, data);
        });
    }
}

// Функция получения курса валют с сервера
function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data);
    });
}


// Часть 2
function main(){    
    
    // Иван
    const Ivan = new Profile({
                username: 'ivan',
                name: { firstName: 'Ivan', lastName: 'Chernyshev' },
                password: 'ivanspass',
    });

    // Петя
    const Petya = new Profile({
                username: 'petya',
                name: { firstName: 'Petya', lastName: 'Vasechkin' },
                password: 'petyaspass',
    });



    // Получение курса текущей валюты к Неткоину
    getStocks((err, data) => {
        if (err) {
                console.error('Error during getting stocks info');                               
        } else {                
                const stocksInfo = data[0]; 

    
        // Создаем пользователя Иван    
        Ivan.createUser((err, data) => {
            if (err) {
                console.error('Error during creating user Ivan');                               
            } else {
                console.log(`Ivan is created!`);                
            }        
        });


            // Авторизуем пользователя Иван
            Ivan.performLogin((err, data) => {
                if (err) {
                        console.error('Error during authorizing user Ivan');                
                } else {
                        console.log(`Ivan is authorized!`);

          
                    // Добавляем денег в кошелек авторизованному пользователю Иван
                    Ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                        if (err) {
                                console.error('Error during adding money to Ivan');                
                        } else {
                                console.log(`Added 500000 euros to Ivan`);
                                const targetAmount = stocksInfo['EUR_NETCOIN'] * 500000;                            
     

                            // Конвертация денег из текущей валюты в Неткоины
                            Ivan.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'Netcoins', targetAmount: targetAmount }, (err, data) => {
                                if (err) {
                                        console.error('Error during converting money');
                                } else {
                                        console.log(`Converted to coins ${targetAmount}`);
    

                                    // Создаем пользователя Петя
                                    Petya.createUser((err, data) => {
                                        if (err) {
                                                console.error('Error during creating user Petya');
                                        } else {
                                                console.log(`Petya is created!`);
    

                                            // Перевод денег от Ивана к Пете
                                            Ivan.transferMoney({ to: Petya.username, amount: 36000 }, (err, data) => {
                                                if (err) {
                                                        console.error('Error during transfering money to Petya');
                                                } else {
                                                        console.log(`Petya has got ${amount} NETCOINS`);
                                                }
                                            });
                                        } 
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

}

main();