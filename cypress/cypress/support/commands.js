// Log in on the QuickPizza admin page with a username and password.
Cypress.Commands.add('adminLogin', (user, password) => {
  cy.visit('/admin')
  // SvelteKit adds this element after the page script starts.
  cy.get('#svelte-announcer').should('exist')
  cy.get('#username').clear().type(user)
  cy.get('#password').clear().type(password, { log: false })
  cy.get('button[type="submit"]').click()
})
