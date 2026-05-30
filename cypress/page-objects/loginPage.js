class LoginPage {
  submitForm(usernameKey, passwordKey) {
    cy.env([usernameKey, passwordKey]).then((envVars) => {
      const user = envVars[usernameKey]
      const pass = envVars[passwordKey]

      cy.get('[placeholder="Username"]').type(user)
      cy.get('[placeholder="Password"]').type(pass)
      cy.get('[data-test="login-button"]').click()
    })
  }
}

export const onLogInPage = new LoginPage()
