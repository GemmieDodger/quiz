describe('My First Test', () => {
    // first login to auth on cypress to cut out having to type password into github

    it('Admin processes!', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Create or edit quiz?').click()
        cy.contains('Edit JavaScript quiz').click()
        cy.url().should('include', '/admin/edit')

        // add question
        cy.get('#addQuestion').type('Fake question here').should('have.value','Fake question here')
        cy.get('#addQuestionCode').type("const num = 0 ").should('have.value',"const num = 0 ")
        cy.get('#addQuestionAnswer1').type('Answer').should('have.value','Answer')
        cy.get('#addQuestionAnswer2').type('Answer').should('have.value','Answer')
        cy.get('#addQuestionAnswer3').type('Answer').should('have.value','Answer')
        cy.get('#addQuestionBoolean').select('true').should('have.value','true')
        cy.contains('Add Question').click()

        // edit question
        cy.get('Form').contains('Fake question here').type(' is wrong')
        cy.contains('Save updates').click() 
        cy.contains('Close').click() 

        // delete question
        cy.get('Form').contains('Fake question here is wrong')
        cy.contains('Delete').click() 
        cy.contains('Close').click() 
    })
  })