import { NEWGAME } from "../constants"
import { NUMBEROFCELLS } from "../../utils/numberOfCells"

const emptyCells = () => {
  const cells = []
  for (let i = 0; i < NUMBEROFCELLS; i++) {
    cells.push(i)
  }
  return cells
}

const initialState = {
  NewGamePositionOf2Cells: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWGAME:
      let newEmptyCells = emptyCells()

      const FirstRandomPosition =
        newEmptyCells[Math.floor(Math.random() * newEmptyCells.length)]
      newEmptyCells[FirstRandomPosition] =
        newEmptyCells[newEmptyCells.length - 1]
      newEmptyCells.pop()

      const SecondRandomPosition =
        newEmptyCells[Math.floor(Math.random() * newEmptyCells.length)]
      newEmptyCells[SecondRandomPosition] =
        newEmptyCells[newEmptyCells.length - 1]
      newEmptyCells.pop()

      let Random2Positions = []
      Random2Positions.push(FirstRandomPosition)
      Random2Positions.push(SecondRandomPosition)
      return {
        ...state,
        NewGamePositionOf2Cells: Random2Positions
      }
    default:
      return state
  }
}

export default reducer
