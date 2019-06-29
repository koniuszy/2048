Cypress.Commands.add('confirmUrl', url => {
  cy.location().should(loc => {
    expect(loc.href).to.eq(url)
  })
})
