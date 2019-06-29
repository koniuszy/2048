/// <reference types="Cypress" />

describe('check all links', () => {
  beforeEach(() => {})

  const myWebsite = 'https://koniuszy.github.io'
  const myGithub = 'https://github.com/koniuszy'
  const originalGame = 'https://play2048.co'

  const checkLink = (attribute, name, url) => {
    it('check <a>tag, text, url and visible', () => {
      cy.visit('/')
      cy.get(`a[${attribute}]`)
        .should('contain', name)
        .should('have.attr', 'href', url)
        .and('be.visible')
    })
  }

  checkLink('data-cy-koniuszy', 'My website', myWebsite)
  checkLink('data-cy-github', 'Github', myGithub)
  checkLink('data-cy-original', 'play2048.co', originalGame)
})
