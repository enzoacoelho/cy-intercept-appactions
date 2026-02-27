describe('Funcionalidade: Cadastro de usuário no Hub de Leitura', () => {

    it('Cenário Positivo - Cadastro com sucesso', () => {
        cy.intercept('POST', 'api/register', {
            statusCode: 201,
            body: {
                "message": "Usuário criado com sucesso.",
                "user": { "id": 15, "name": "Teste", "email": "usuarioteste@hotmail.com", "isAdmin": false }
            }
        }).as('cadastroMock')

        cy.visit('register.html')
        cy.cadastrarUsuario('Admin', 'admin@biblioteca.com', 87887877, 'admin123', 'admin123')

        cy.wait('@cadastroMock')
        cy.get('#alert-container').should('contain', 'Conta criada com sucesso! Fazendo login...')
    });

    it('Cenário Negativo - Email já usado', () => {
        cy.intercept('POST', 'api/register', {
            statusCode: 400,
            body: { "message": "Email já está sendo usado por outro usuário." }
        }).as('cadastroMock')

        cy.visit('register.html')
        cy.cadastrarUsuario('Teste', 'emailNovo@hotmail.com', 87887877, 'Teste@1234', 'Teste@1234')

        cy.wait('@cadastroMock')
        cy.get('#alert-container').should('contain', 'Erro ao criar conta. Tente novamente.')
    });


});