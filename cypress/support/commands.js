// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('cadastrarUsuario', (nome, email, telefone, senha, confirmaSenha) => {
    cy.get('#name').clear().type(nome)
    cy.get('#email').clear().type(email)
    cy.get('#phone').clear().type(telefone)
    cy.get('#password').clear().type(senha)
    cy.get('#confirm-password').clear().type(confirmaSenha)
    cy.get('#terms-agreement').click()
    cy.get('#register-btn').click()

})

Cypress.Commands.add('loginApp', (email, senha, isAdmin) => {
    cy.request({
        method: 'POST',
        url: 'api/login',
        body: {
            "email": email,
            "password": senha
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        
        const token = response.body.token
        window.localStorage.setItem('authToken', token)

        if (isAdmin) {
            window.localStorage.setItem('isAdmin', true)
            cy.visit('admin-dashboard.html')
            cy.get('.admin-header').should('contain', 'Painel Administrativo')
        } else {
            cy.visit('dashboard.html')
            cy.get('h4').should('contain', 'Olá')
        }

        return cy.wrap(token)

    })
})

