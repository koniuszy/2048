import { NEWGAME, GODOWN, GOUP, GOLEFT, GORIGHT } from "../constants"
import { NUMBEROFCELLS, ROW } from "../../utils/numberOfCells"
import {
  getEmptyCells,
  getRandomValue,
  getRandomNumberOfArray,
  move
} from "./functions/game"

const initialStates = {
  Numbers: []
}

const reducer = (state = initialStates, action) => {
  const randomValue = getRandomValue()
  const { Numbers } = state
  let newNumbers = []
  let PositionOfNextCell

  switch (action.type) {
    case NEWGAME:
      let emptyCells = getEmptyCells()
      let randomPosition

      for (let i = 0; i < action.payload.amount; i++) {
        let PositionAndValue = []
        randomPosition = getRandomNumberOfArray(emptyCells)
        PositionAndValue.push(emptyCells[randomPosition])
        if (i !== 0 && newNumbers[0][1] === 4) {
          PositionAndValue.push(2)
        } else {
          PositionAndValue.push(randomValue)
        }
        PositionAndValue.push(NEWGAME)
        newNumbers.push(PositionAndValue)
        emptyCells = getEmptyCells(newNumbers[0])
      }

      return {
        Numbers: newNumbers
      }

    case GODOWN:
      Numbers.sort(function(a, b) {
        return b[0] - a[0]
      })
      const firstRowDown = position => {
        return position < NUMBEROFCELLS - ROW
      }
      PositionOfNextCell = 4
      newNumbers = move(Numbers, firstRowDown, PositionOfNextCell)
      return {
        Numbers: newNumbers
      }

    case GOUP:
      Numbers.sort(function(a, b) {
        return a[0] - b[0]
      })
      const firstRowUp = position => {
        return position >= ROW
      }
      PositionOfNextCell = -4
      newNumbers = move(Numbers, firstRowUp, PositionOfNextCell)
      return {
        Numbers: newNumbers
      }

    case GORIGHT:
      Numbers.sort(function(a, b) {
        return b[0] - a[0]
      })
      const firstRowRight = position => {
        if (position === NUMBEROFCELLS - 1) {
          return false
        }
        return !((position + 1) % 4 === 0)
      }
      PositionOfNextCell = 1
      newNumbers = move(Numbers, firstRowRight, PositionOfNextCell)
      return {
        Numbers: newNumbers
      }

    case GOLEFT:
      Numbers.sort(function(a, b) {
        return a[0] - b[0]
      })
      const firstRowLeft = position => {
        if (position === 0) {
          return false
        }
        return !(position % 4 === 0)
      }
      PositionOfNextCell = -1
      newNumbers = move(Numbers, firstRowLeft, PositionOfNextCell)
      return {
        Numbers: newNumbers
      }

    default:
      return state
  }
}

export default reducer
