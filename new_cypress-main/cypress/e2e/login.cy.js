import * as data from "../helpers/default_data.json"
import * as page from "../locators/main_page.json"
import * as recovery from "../locators/recovery_password_page.json"
import * as result from "../locators/result_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');
        });

    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
        });

    it('Проверка на позитивный кейс авторизации', function () {
         cy.get(page.email).type('USER_LOGIN'); //ввели верный логин
         cy.get(page.password).type('USER_PASSWORD'); //ввели верный пароль
         cy.get(page.login_button).click(); //нажал "войти"

         cy.get(result.title).contains('Авторизация прошла успешно'); //проверяю что после авторизации вижу текст
         cy.get(result.title).should('be.visible');
     })

     it('Проверка логики восстановления пароля', function () {
        cy.get(page.fogot_pass_btn).click(); //нажал "восстановить пароль"

        cy.get(recovery.email).type('USER_LOGIN') //ввел почту для восстановления
        cy.get(recovery.send_button).click(); //нажал "Отправить код"

        cy.get(result.title).contains('Успешно отправили пароль на e-mail'); //проверяю что после авторизации вижу текст
        cy.get(result.title).should('be.visible');
    })

     it('Проверка на негативный кейс авторизации:', function () {
        cy.get(page.email).type('USER_LOGIN'); //ввели верный логин
        cy.get(page.password).type('USER_PASSWORD'); //ввели НЕверный пароль
        cy.get(page.login_button).click(); //нажал "войти"

        cy.get(result.title).contains('Такого логина или пароля нет'); //проверяю что после авторизации вижу текст
        cy.get(result.title).should('be.visible');
    })

    it('Проверка на негативный кейс валидации', function () {
        cy.get(page.email).type('USER_LOGIN'); //ввели логин без @
        cy.get(page.password).type('USER_PASSWORD'); //ввели верный пароль
        cy.get(page.login_button).click(); //нажал "войти"

        cy.get(result.title).contains('Нужно исправить проблему валидации'); //проверяю что после авторизации вижу текст
        cy.get(result.title).should('be.visible');
    })

    it('Проверка на приведение к строчным буквам в логине', function () {
        cy.get(page.email).type('USER_LOGIN'); //ввели верный логин
        cy.get(page.password).type('USER_PASSWORD'); //ввели верный пароль
        cy.get(page.login_button).click(); //нажал "войти"

        cy.get(result.title).contains('Авторизация прошла успешно'); //проверяю что после авторизации вижу текст
        cy.get(result.title).should('be.visible');
    })
    
 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/login.cy.js --browser chrome
 