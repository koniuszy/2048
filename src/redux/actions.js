import { NEWGAME, GODOWN } from "./constants"

export const newGame = amount => {
  return {
    type: NEWGAME,
    payload: {
      amount
    }
  }
}

export const goDown = () => {
  return {
    type: GODOWN
  }
}
