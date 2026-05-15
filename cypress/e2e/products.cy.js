describe('Checkout', () => {
    let lowestPrice = 7.99
    let highestPrice = 49.99

    beforeEach('Open website and authenticate', () =>
    {
      cy.uiLogin()
    })

    it.skip('Complete checkout', () => {
      cy.addProductToCart()
      cy.get('.shopping_cart_link').click()
      cy.get('.cart_item').should('be.visible').and('contain.text', 'Sauce Labs Backpack')
      cy.get('#checkout').click()
      cy.get('[data-test="firstName"]').type('John', { force: true, delay: 100 })
      cy.get('[data-test="lastName"]')
        .click()
        .focused() // assert this element is the active one
        .should('have.attr', 'data-test', 'lastName') // confirm focus is on the RIGHT field
        .type('Doe', { force: true })

      cy.get('[data-test="postalCode"]').type('12345', { force: true, delay: 100 })
      cy.get('[data-test="firstName"]').reactType('Value 1')
      cy.get('#last-name').reactType('Value 2')
      cy.get('#postal-code').reactType('Value 3')
      cy.get('#continue').click()
      cy.get('.summary_total_label').should('be.visible').and('not.be.empty')
      cy.get('#finish').click()
      cy.get('.complete-header').should('be.visible').and('contain.text', 'Thank you for your order!')
      cy.get('#back-to-products').click()
      cy.location('pathname').should('eq', '/inventory.html')
  })

  it('Sort products by price > low to high', () => {
    cy.get('.product_sort_container').select('lohi')
    cy.get('.active_option').should('have.text', 'Price (low to high)')
    cy.get('.inventory_item').first().should('contain.text', `$${lowestPrice}`)
  })

  it('Sort products by price > high to low', () => {
    cy.get('.product_sort_container').select('hilo')
    cy.get('.active_option').should('have.text', 'Price (high to low)')
    cy.get('.inventory_item').first().should('contain.text', `$${highestPrice}`)
  })

})