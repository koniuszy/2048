/// <reference types="Cypress" />

import { NUMBEROFCELLS, ROW } from '../../src/utils/constants'
import { NEWGAME, UNDO, GOUP, GODOWN } from '../../src/redux/constants'
import { action } from '../../src/redux/actions'

describe('check all States in Redux', () => {
  const getStore = () => {
    return cy.window().its('store')
  }
  const getState = () => {
    return getStore().invoke('getState')
  }
  const dispatchAction = type => {
    getStore().invoke('dispatch', action(type))
  }

  beforeEach(() => {
    cy.visit('/')
  })
  afterEach(() => {
    dispatchAction(NEWGAME)
  })

  const checkNewGame = () => {
    getState()
      .its('Numbers')
      .should('have.length', '2')
      .then(Numbers => {
        Numbers.forEach(number => {
          expect(number).to.have.length('3')
          expect(number[0])
            .to.be.gte(0)
            .and.to.be.lte(NUMBEROFCELLS)
          if (number[1] === 2) {
            expect(number[1]).to.be.eq(2)
          } else {
            expect(number[1]).to.be.eq(4)
          }
          expect(number[2]).to.be.eq(NEWGAME)
        })

        expect(Numbers[0][1] + Numbers[1][1]).to.be.lte(6)

        getState()
          .its('PrevNumbers')
          .should('be.equal', Numbers)
      })
  }

  context('test states on the beginning ', () => {
    it('check Numbers and PrevNumbers states', () => {
      checkNewGame()
    })

    it('check PrevPrevNumbers state', () => {
      getState()
        .its('PrevPrevNumbers')
        .should('be.empty')
    })

    it('check AmountOfUnDos state', () => {
      getState()
        .its('AmountOfUnDos')
        .should('be.eq', 3)
    })

    it('check if the game is running', () => {
      getState()
        .its('IsPlaying')
        .then(isPlaying => {
          assert.isTrue(isPlaying)
        })
    })

    it('check PrevPrevNumbers state', () => {
      getState()
        .its('PrevPrevNumbers')
        .should('be.empty')
    })

    it('test newGame on the begining', () => {
      dispatchAction(NEWGAME)
      checkNewGame()
    })

    it('test Undo right afterNewGame', () => {
      dispatchAction(UNDO)
      checkNewGame()
    })
  })

  //// moving numbers and position

  context.only('test moving Numbers', () => {
    it('check if numbers are max up', () => {
      dispatchAction(GOUP)
    })
  })
})
