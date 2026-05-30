import { onLogInPage } from '../page-objects/loginPage'

describe('Authentication', () => {
  beforeEach('Open website', () => {
    cy.visit('/')
  })

  it('Login with valid credentials', () => {
    onLogInPage.submitForm('valid_username', 'valid_password')
    cy.get('#inventory_container').should('be.visible').and('not.be.empty')
  })

  it('Login with invalid credentials', () => {
    onLogInPage.submitForm('valid_username', 'invalid_password')
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and(
        'contain.text',
        'Epic sadface: Username and password do not match any user in this service'
      )
  })
})
