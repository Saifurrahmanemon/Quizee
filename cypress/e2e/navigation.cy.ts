describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should get the Home page', () => {
    cy.get('div').contains('Home').click();
    cy.url().should('eq', 'http://localhost:3000/home');
  });

  // user not logged, will redirect to register page
  it('should get the Quizzes page', () => {
    cy.get('div').contains('Quizzes').click();
    cy.url().should('eq', 'http://localhost:3000/register');
  });
});
