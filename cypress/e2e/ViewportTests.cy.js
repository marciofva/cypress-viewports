const sizes = [[1024, 768], [412, 915], [360, 760]]

describe('Lauching webpage in multiple screen resolutions', () => {

  sizes.forEach((size) => {
    it(`Should launch the webpage on ${size} screen`, () => {
      if (Cypress._.isArray(size)) {
        cy.launchBrowser(size[0], size[1])
      } else {
        cy.viewport(size)
      }
      cy.get('#search_query_top').should('be.visible')
      
      // Take a screenshot naming with the browser name and the screen resolution as a part of its name.
      cy.screenshot(`screenshot_${Cypress.browser.name}_${size[0]}x${size[1]}`)
    })
  })
})
