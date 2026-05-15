// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('uiLogin', () => {
    cy.session('user', () => {
        cy.visit('/')

        cy.env(['valid_username', 'valid_password']).then(({ valid_username, valid_password }) => {
            cy.get('[placeholder="Username"]').type(valid_username)
            cy.get('[placeholder="Password"]').type(valid_password)
            cy.get('[data-test="login-button"]').click()
            cy.get('#inventory_container').should('be.visible').and('not.be.empty')
            cy.location('pathname').should('eq', '/inventory.html')
        }) 
    })
        cy.visit('https://www.saucedemo.com/inventory.html' , { failOnStatusCode: false })
})

Cypress.Commands.add('addProductToCart', () => {
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack')
    cy.get('[id="add-to-cart-sauce-labs-backpack"').contains('Add to cart').click()
    cy.get('[id="remove-sauce-labs-backpack"').should('be.visible').and('contain.text', 'Remove')
    cy.get('.shopping_cart_badge').should('be.visible').and('contain.text', '1')
})

