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
      let NewGameNumbers = []
      for (let i = 0; i < action.payload.amount; i++) {
        let PositionAndValue = []
        const randomPosition =
          newEmptyCells[Math.floor(Math.random() * newEmptyCells.length)]
        const randomValue = Math.floor(Math.random() * 2 + 1) * 2
        newEmptyCells[randomPosition] = newEmptyCells[newEmptyCells.length - 1]
        newEmptyCells.pop()
        PositionAndValue.push(randomPosition)
        if (i !== 0 && NewGameNumbers[0][1] === "4") {
          PositionAndValue.push("2")
        } else {
          PositionAndValue.push(randomValue.toString())
        }
        NewGameNumbers.push(PositionAndValue)
      }
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
