import { NEWGAME, GODOWN } from "./constants"

export const newGame = () => {
  return {
    type: NEWGAME
  }
}

export const goDown = () => {
  return {
    type: GODOWN
  }
}
