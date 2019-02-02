// https://docs.cypress.io/api/introduction/api.html

describe('VFG Schema Builder', () => {
  it('Visits the Schema Builder', () => {
    cy.visit('/vfg-builder');
    cy.contains('button', 'Group');

    cy.screenshot('001-landing');

    cy.get("#element-picker button:contains('Input')").click();
    cy.get("#element-picker button:contains('Group')").click();
    cy.get("#element-picker button:contains('Group')").click();

    cy.screenshot('002-elements_added');

    cy.get("#element-list button:contains('input')").click();

    cy.get('#field-configurator .group-picker').select('Group 1');
  });
});
