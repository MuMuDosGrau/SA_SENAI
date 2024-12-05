describe('Cadastrar EPI', () => {

  it('Deve cadastrar a epi', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#epis').click()
    cy.get('#input-cadastrar').type('Colete')
    cy.get('#cadastrar').click()
  })
})

describe('Cadastrar Funcionário', () => {

  it('Deve cadastrar o funcionário', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#funcionario').click()
    cy.get('#input-cadastrar').type('Silvio Percicotte')
    cy.get('#cadastrar').click()
  })
})

describe('Cadastrar Retirada', () => {

  it('Deve cadastrar a retirada', () => {
    cy.visit('http://localhost:5173/')

    cy.get('#retirada').click()
    cy.get('#funcionario').type('Silvio Percicotte')
    cy.get('#epi').type('Colete')
    cy.get('#data').type('2024-12-04')
    cy.get('#select-tipo').contains('Retirada')
    cy.get('#cadastrar').click()
  })
})