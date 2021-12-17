describe('My Functionality Tests for user who has not been logged in', () => {

    it('User has no login processes!', () => {
        cy.visit('http://localhost:3000/')
        
        cy.contains('JavaScript Quiz').click()
        cy.url().should('include', '/quiz')
        
        // answer questions
        cy.get('#answerOption0').click()
        cy.get('#answerOption1').click()
        cy.get('#answerOption2').click()
        cy.get('#answerOption0').click()
        cy.get('#answerOption1').click()
        cy.get('#answerOption2').click()
        cy.get('#answerOption2').click()

        cy.contains('Incorrect answers').click()
        // go back to home
        cy.contains('Go back to Home').click()
        cy.url().should('include', '/')
    })
  })