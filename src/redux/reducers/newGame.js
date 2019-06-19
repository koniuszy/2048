import { NEWGAME, GODOWN } from "../constants"
import { NUMBEROFCELLS } from "../../utils/numberOfCells"

const emptyCells = () => {
  const cells = []
  for (let i = 0; i < NUMBEROFCELLS; i++) {
    cells.push(i)
  }
  return cells
}

const initialStates = {
  FirstNumberPositionAndValue: null,
  SecondNumberPositionAndValue: null,
  EmptyCells: null
}

const reducer = (state = initialStates, action) => {
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

      let SecondRandomValue = null
      let FirstRandomValue = Math.floor(Math.random() * 2 + 1) * 2
      if (FirstRandomValue === 4) {
        SecondRandomValue = 2
      } else {
        SecondRandomValue = Math.floor(Math.random() * 2 + 1) * 2
      }

      SecondRandomValue = SecondRandomValue.toString()
      FirstRandomValue = FirstRandomValue.toString()

      let FirstNumberPositionAndValue = []
      FirstNumberPositionAndValue.push(FirstRandomPosition)
      FirstNumberPositionAndValue.push(FirstRandomValue)

      let SecondNumberPositionAndValue = []
      SecondNumberPositionAndValue.push(SecondRandomPosition)
      SecondNumberPositionAndValue.push(SecondRandomValue)

      const NewGameNumbers = []
      NewGameNumbers.push(FirstNumberPositionAndValue)
      NewGameNumbers.push(SecondNumberPositionAndValue)
      console.log(NewGameNumbers)

      return {
        ...state,
        Numbers: NewGameNumbers,
        EmptyCells: newEmptyCells
      }
    case GODOWN:
      console.log(
        `There are ${NUMBEROFCELLS - state.EmptyCells.length} numbers`
      )
      console.log()
      return {
        ...state
      }
    default:
      return state
  }
}

export default reducer
