import { NEWGAME, GODOWN, GOUP, GOLEFT, GORIGHT, UNDO } from '../constants'
import { NUMBEROFCELLS, ROW } from '../../utils/numberOfCells'
import { move } from './functions/move'
import {
  getEmptyCells,
  getRandomValue,
  getRandomNumberOfArray,
  getPrevNumbers,
  getPrevPrevNumbers,
  arraysAreEqual,
  getScore,
  sort
} from './functions/game'

const initialStates = {
  Numbers: [],
  PrevNumbers: [],
  PrevPrevNumbers: [],
  Animation: '',
  AmountOfUnDos: 3,
  HighestNumber: 4
}

const reducer = (state = initialStates, action) => {
  const randomValue = getRandomValue()
  const { Numbers, PrevNumbers, PrevPrevNumbers, HighestNumber } = state
  let prevNumbers = getPrevNumbers(Numbers, PrevNumbers, PrevPrevNumbers)
  let prevPrevNumbers = getPrevPrevNumbers(
    Numbers,
    PrevNumbers,
    PrevPrevNumbers
  )
  let newNumbers = []
  let PositionOfNextCell
  let newScore
  let animations

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
      sort(Numbers, true)
      const firstRowDown = position => {
        return position < NUMBEROFCELLS - ROW
      }
      PositionOfNextCell = 4
      newNumbers = move(Numbers, firstRowDown, PositionOfNextCell)
      newScore = getScore(newNumbers, HighestNumber)
      return {
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore,
        Animations: animations
      }

    case GOUP:
      sort(Numbers)
      const firstRowUp = position => {
        return position >= ROW
      }
      PositionOfNextCell = -4
      newNumbers = move(Numbers, firstRowUp, PositionOfNextCell)
      newScore = getScore(newNumbers, HighestNumber)
      return {
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
      }

    case GORIGHT:
      sort(Numbers, true)
      const firstRowRight = position => {
        if (position === NUMBEROFCELLS - 1) {
          return false
        }
        return !((position + 1) % 4 === 0)
      }
      PositionOfNextCell = 1
      newNumbers = move(Numbers, firstRowRight, PositionOfNextCell)
      newScore = getScore(newNumbers, HighestNumber)
      return {
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
      }

    case GOLEFT:
      sort(Numbers)
      const firstRowLeft = position => {
        if (position === 0) {
          return false
        }
        return !(position % 4 === 0)
      }
      PositionOfNextCell = -1
      newNumbers = move(Numbers, firstRowLeft, PositionOfNextCell)
      newScore = getScore(newNumbers, HighestNumber)
      return {
        ...state,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
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
