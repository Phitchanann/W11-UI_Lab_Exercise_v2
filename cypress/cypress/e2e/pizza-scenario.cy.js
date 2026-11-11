// QP-01 follows a customer request through the admin list in one browser.
const stamp = () => {
  const d = new Date()
  const two = (n) => String(n).padStart(2, '0')
  return d.getFullYear() + two(d.getMonth() + 1) + two(d.getDate()) +
    '-' + two(d.getHours()) + two(d.getMinutes()) + two(d.getSeconds())
}

describe('QP-01 A custom pizza reaches the admin list', () => {
  it('follows the seven steps of QP-01', () => {
    const pizzaName = 'Lab Pizza ' + stamp()

    // Step 1: open QuickPizza and check the heading.
    cy.visit('/')
    cy.get('h1').should('have.text', 'Looking to break out of your pizza routine?')

    // Step 2: show the four advanced fields.
    cy.contains('label', 'Advanced').click()
    cy.contains('label', 'Max Calories per Slice').siblings('input').should('be.visible')
    cy.get('select').should('be.visible')
    cy.get('#default-checkbox').should('be.visible')
    cy.get('input#pizza-name').should('be.visible')

    // Step 3: enter the restrictions and a unique pizza name.
    cy.contains('label', 'Max Calories per Slice')
      .siblings('input').clear().type('600').should('have.value', '600')
    cy.get('select').select('Knife')
    cy.contains('option', 'Knife').should('be.selected')
    cy.get('#default-checkbox').check().should('be.checked')
    cy.get('input#pizza-name').type(pizzaName).should('have.value', pizzaName)

    // Step 4: request the pizza and compare the page with the API response.
    cy.intercept('POST', '/api/pizza').as('pizza')
    cy.get('button[name="pizza-please"]').click()
    cy.wait('@pizza').its('response.statusCode').should('eq', 200)
    cy.get('@pizza').then(({ request, response }) => {
      expect(request.body.maxCaloriesPerSlice).to.equal(600)
      const { pizza, calories } = response.body
      cy.get('#recommendations').should('contain', 'Name: ' + pizzaName)
      cy.contains('#recommendations p', 'Tool:')
        .should('have.text', 'Tool: ' + pizza.tool)
        .and('not.contain', 'Knife')
      cy.contains('#recommendations p', 'Calories per slice:')
        .should('have.text', 'Calories per slice: ' + calories)
      expect(calories).to.be.at.most(600)
      cy.wrap(pizza.tool).as('tool')
    })
    cy.screenshot('qp01-step4-recommendation')

    // Step 5: confirm rating asks for a login.
    cy.get('button[name="rate-5"]').click()
    cy.get('#rate-result').should('have.text', 'Please log in first.')
    cy.screenshot('qp01-step5-login-needed')

    // Step 6: log in on the admin page in the same browser.
    cy.adminLogin('admin', 'admin')
    cy.contains('Latest pizza recommendations').should('be.visible')

    // Step 7: find this pizza and verify it lists the recommended tool.
    cy.get('@tool').then((tool) => {
      cy.contains('li', pizzaName).should('contain', '(tool=' + tool + ',')
    })
    cy.screenshot('qp01-step7-admin-list')
  })
})
