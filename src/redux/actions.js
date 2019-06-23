import { NEWGAME } from './constants'

export const newGame = amount => {
  return {
    type: NEWGAME,
    payload: {
      amount
    }
  }
}

export const move = type => {
  return {
    type: type
  }
}
