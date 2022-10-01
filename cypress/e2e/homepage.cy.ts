describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  /**
  TODO: will check all the elements
  */

  it('should home text exist', () => {
    cy.get('[data-cy=home-title]').should('have.length', 1);
  });

  it('should redirect to the repo url', () => {
    cy.get('[data-cy=open-source-code]').contains('Source Code').click();
  });
});
