describe('Editar e Remover EPIs', () => {
  it('Deve editar epi', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#epis').click()
    cy.get('#editar').first().click()
    cy.get('#nome-editado').clear().type('Luva')
    cy.get('#salvar').click()
  })
  it('Deve remover epi', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#epis').click()
    cy.get('#remover').first().click()
  })
})

describe('Editar e Remover Funcionários', () => {
  it('Deve editar epi', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#funcionario').click()
    cy.get('#editar').first().click()
    cy.get('#nome-editado').clear().type('Paulo Cesar')
    cy.get('#salvar').click()
  })
  it('Deve remover funcionario', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#funcionario').click()
    cy.get('#remover').first().click()
  })
})