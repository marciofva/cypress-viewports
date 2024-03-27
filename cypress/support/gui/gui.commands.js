Cypress.Commands.add('launchBrowser', (width, height, orientation='portrait') => {
    cy.visit('/').viewport(width, height, orientation).title().should('include', 'My Shop')
})
