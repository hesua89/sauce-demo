describe('Authentication', () => {
  
  beforeEach('Open website', () =>
    {
      cy.visit('/')
    })
  
  it('Login with valid credentials', () => {
    cy.env(['valid_username', 'valid_password']).then(({ valid_username, valid_password }) => {
      cy.get('[placeholder="Username"]').type(valid_username)
      cy.get('[placeholder="Password"]').type(valid_password)
      cy.get('[data-test="login-button"]').click()
      cy.get('#inventory_container').should('be.visible').and('not.be.empty')
    })
  })

  it('Login with invalid credentials', () => {
    cy.env(['valid_username', 'invalid_password']).then(({ valid_username, invalid_password }) => {
      cy.get('[placeholder="Username"]').type(valid_username)
      cy.get('[placeholder="Password"]').type(invalid_password)
      cy.get('[data-test="login-button"]').click()
      cy.get('[data-test="error"]').should('be.visible').and('contain.text','Epic sadface: Username and password do not match any user in this service')
    })
  })
})