import * as data from "../helpers/default_data.json"

describe('Покупка нового аватара для своего тренера', function () {

    it('e2e на покупку нового аватара', function () {
        cy.visit('https://pokemonbattle.ru/login');
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); //ввели верный логин
        cy.get('#password').type('USER_PASSWORD'); //ввели верный пароль
        cy.get('.auth__button').click(); //нажал "войти"
        cy.wait(2000);
        cy.get('.header__container > .header__id').click();
        cy.wait(2000);
        cy.get('[href="/shop"]').click();
        cy.get('.available > button').first().click({ force: true });
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4620869113632996');
        cy.get(':nth-child(1) > .pay_base-input-v2').type('1225');
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125');
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('PAVEL KOLESNIKOV');
        cy.get('.pay-btn').click();
        cy.get('#cardnumber').type('56456');
        cy.get('.payment__submit-button').click();
        cy.get('.payment__font-for-success').contains('Покупка прошла успешно');
        cy.get('.payment__font-for-success').should('be.visible');
        cy.get('.payment__adv').click();
     })
    
 })
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/end-to-end.cy.js --browser chrome
 