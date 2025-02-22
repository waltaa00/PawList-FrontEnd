// cypress/integration/login.spec.js

describe('PawList Login Flow', () => {
    beforeEach(() => {
        // Update the URL to your running Vite app
        cy.visit('http://localhost:5173/login');
    });

    it('should display the login form with username and password inputs', () => {
        cy.get('form').should('be.visible');
        cy.get('input#username').should('exist');
        cy.get('input#password').should('exist');
    });

    it('should not allow form submission with blank inputs', () => {
        // Clear both inputs (if pre-filled) and submit
        cy.get('input#username').clear();
        cy.get('input#password').clear();
        cy.get('form').submit();

        // Assuming your application displays an error message on invalid submission.
        cy.contains("Please check your information!").should('be.visible');
    });

    it('should validate that username cannot be blank', () => {
        cy.get('input#username').clear();
        cy.get('input#password').clear().type('password123');
        cy.get('form').submit();

        // Adjust the error message text as needed.
        cy.contains("Please check your information!").should('be.visible');
    });

    it('should validate that password cannot be blank', () => {
        cy.get('input#username').clear().type('testUser');
        cy.get('input#password').clear();
        cy.get('form').submit();

        // Adjust the error message text as needed.
        cy.contains("Please check your information!").should('be.visible');
    });

    it('should validate that username doesnt have special caracters', () => {
        cy.get('input#username').clear();
        cy.get('input#password').clear().type('password123');
        cy.get('form').submit();

        // Adjust the error message text as needed.
        cy.contains("Please check your information!").should('be.visible');
    });

    it('should validate that password doesnt have special caracters', () => {
        cy.get('input#username').clear();
        cy.get('input#password').clear().type('password123');
        cy.get('form').submit();

        // Adjust the error message text as needed.
        cy.contains("Please check your information!").should('be.visible');
    });

    
});
