const { Builder, By } = require('selenium-webdriver');

(async function loginTests() {
    let driver = await new Builder().forBrowser('chrome').build();

    // Login
    async function login(username, password) {
        await driver.get('https://sakshingp.github.io/assignment/login.html');
        await driver.findElement(By.id('username')).sendKeys('Maharth');
        await driver.findElement(By.id('password')).sendKeys('Maharth143');
        await driver.findElement(By.className('btn btn-primary')).click();
    }

    async function checkElementDisplayed(selector) {
        try {
            const element = await driver.findElement(selector);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async function sortAmountColumn() {
        await driver.executeScript('window.scrollTo(0, 0);');
        await driver.findElement(By.id('status'),5000).click();
        await driver.findElement(By.id('date'),5000).click();
        await driver.findElement(By.id('description'),5000).click();
        await driver.findElement(By.id('category'),5000).click();
        await driver.findElement(By.id('amount'),5000).click();

    }

    //Home Page

    async function getAmountValues() {
        const amountElements = await driver.findElements(By.css('#transactionTable td.amount'));
        const amounts = [];
        for (let element of amountElements) {
            let text = await element.getText();
            amounts.push(parseFloat(text.replace(/[^0-9.-]+/g, "")));
        }
        return amounts;
    }

    function isSorted(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                return false;
            }
        }
        return true;
    }

    async function runTests() {
        console.log("Running tests");

        // Login
        await login();

        // Check if login successful
        const isHomePageDisplayed = await checkElementDisplayed(By.id('transactionTable'));
        console.log('Test - Login successful: ' + (isHomePageDisplayed ? 'Passed' : 'Failed'));

        // Test - Sorting Amount column
        await sortAmountColumn();
        const amounts = await getAmountValues();
        const sorted = isSorted(amounts);
        console.log('Test - Amount column sorting: ' + (sorted ? 'Passed' : 'Failed'));

       
    }

    runTests().catch(error => console.log(error));
})();











