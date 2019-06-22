import { NEWGAME, GODOWN, GOUP, GOLEFT, GORIGHT, UNDO } from "../constants"
import { NUMBEROFCELLS, ROW } from "../../utils/numberOfCells"
import {
  getEmptyCells,
  getRandomValue,
  getRandomNumberOfArray,
  move,
  getPrevNumbers,
  getPrevPrevNumbers,
  arraysAreEqual
} from "./functions/game"

const initialStates = {
  Numbers: [],
  PrevNumbers: [],
  PrevPrevNumbers: [],
  AmountOfUnDos: 3,
  HighestNumber: 2048
}

const reducer = (state = initialStates, action) => {
  const randomValue = getRandomValue()
  const { Numbers, PrevNumbers, PrevPrevNumbers } = state
  let newNumbers = []
  let PositionOfNextCell

  let prevNumbers = getPrevNumbers(Numbers, PrevNumbers, PrevPrevNumbers)
  let prevPrevNumbers = getPrevPrevNumbers(
    Numbers,
    PrevNumbers,
    PrevPrevNumbers
  )

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
        ...state,
        PrevNumbers: newNumbers,
        PrevPrevNumbers: [],
        Numbers: newNumbers,
        AmountOfUnDos: 3
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
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers
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
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers
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
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers
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
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers
      }

    case UNDO:
      let amountsOfUnDos = state.AmountOfUnDos - 1
      let newNumbersAfterUndo = state.Numbers
      if (amountsOfUnDos >= 0) {
        newNumbersAfterUndo = state.PrevNumbers
      }
      if (arraysAreEqual(Numbers, PrevNumbers)) {
        newNumbersAfterUndo = PrevPrevNumbers
      }
      return {
        ...state,
        Numbers: newNumbersAfterUndo,
        AmountOfUnDos: amountsOfUnDos,
        PrevPrevNumbers: []
      }

    default:
      return state
  }
}

export default reducer
