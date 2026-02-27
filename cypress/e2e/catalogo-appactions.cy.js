import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro de usuário no Hub de Leitura', () => {

    beforeEach(() => {
        cy.visit('login.html')
        //cy.setCookie('jwt_education_shown', 'true')

    });

    it('Deve cadastrar um livro com sucesso', () => {
        cy.loginApp(Cypress.env('ADMIN_EMAIL'), Cypress.env('ADMIN_SENHA'), true).then((token) => {

            const livro = {
                title: faker.lorem.words(3),
                author: faker.person.fullName(),
                category: 'Infantil',
                total_copies: 6
            }

            cy.request({
                method: 'POST',
                url: 'api/books',
                headers: {
                    Authorization: token
                },
                body: livro
            }).then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.book.title).to.eq(livro.title)
            })

            cy.visit('admin-books.html')
            cy.get('#search-input').type(livro.title)
            cy.get('.books-card').should('contain', livro.title)
            cy.get('.books-card').should('contain', livro.author)
            cy.get('.d-flex > div > strong').should('contain', livro.title)
            cy.get('#books-tbody > tr > :nth-child(3)').should('contain', livro.author)

        })

    })

});