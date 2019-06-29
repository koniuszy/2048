import { NEWGAME, GODOWN, GOUP, GOLEFT, GORIGHT, UNDO } from '../constants'
import { AMOUNTOFNEWGAMENUMBERS } from '../../utils/constants'
import { move } from './functions/move'
import {
  getEmptyCells,
  getRandomValue,
  getRandomNumberOfArray,
  getPrevNumbers,
  getPrevPrevNumbers,
  arraysAreEqual,
  getScore,
  sort,
  firstRowLeft,
  firstRowRight,
  firstRowDown,
  firstRowUp
} from './functions/game'

const initialStates = {
  Numbers: [],
  PrevNumbers: [],
  PrevPrevNumbers: [],
  AmountOfUnDos: 3,
  HighestNumber: 4,
  IsPlaying: true
}

const reducer = (state = initialStates, action) => {
  let isPlaying = true
  const randomValue = getRandomValue()
  const { Numbers, PrevNumbers, PrevPrevNumbers, HighestNumber } = state
  let newNumbers = []
  let PositionOfNextCell
  let newScore = state.HighestNumber
  let prevNumbers
  let prevPrevNumbers

  switch (action.type) {
    case NEWGAME:
      let emptyCells = getEmptyCells()
      let randomPosition
      for (let i = 0; i < AMOUNTOFNEWGAMENUMBERS; i++) {
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
        IsPlaying: true,
        PrevNumbers: newNumbers,
        PrevPrevNumbers: [],
        Numbers: newNumbers,
        AmountOfUnDos: 3
      }

    case GODOWN:
      sort(Numbers, true)
      PositionOfNextCell = 4
      newNumbers = move(Numbers, firstRowDown, PositionOfNextCell)
      if (newNumbers) {
        newScore = getScore(newNumbers, HighestNumber)
      } else {
        newNumbers = Numbers
        isPlaying = false
        prevNumbers = state.PrevNumbers
        prevPrevNumbers = state.PrevPrevNumbers
      }

      prevNumbers = getPrevNumbers(
        Numbers,
        PrevNumbers,
        PrevPrevNumbers,
        newNumbers
      )
      prevPrevNumbers = getPrevPrevNumbers(
        Numbers,
        PrevNumbers,
        PrevPrevNumbers,
        newNumbers
      )

      return {
        ...state,
        IsPlaying: isPlaying,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
      }

    case GOUP:
      sort(Numbers)
      PositionOfNextCell = -4
      newNumbers = move(Numbers, firstRowUp, PositionOfNextCell)
      if (newNumbers) {
        newScore = getScore(newNumbers, HighestNumber)
        prevNumbers = getPrevNumbers(
          Numbers,
          PrevNumbers,
          PrevPrevNumbers,
          newNumbers
        )
        prevPrevNumbers = getPrevPrevNumbers(
          Numbers,
          PrevNumbers,
          PrevPrevNumbers,
          newNumbers
        )
      } else {
        newNumbers = Numbers
        isPlaying = false
        prevNumbers = state.PrevNumbers
        prevPrevNumbers = state.PrevPrevNumbers
      }

      return {
        ...state,
        IsPlaying: isPlaying,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
      }

    case GORIGHT:
      sort(Numbers, true)
      PositionOfNextCell = 1
      newNumbers = move(Numbers, firstRowRight, PositionOfNextCell)
      if (newNumbers) {
        newScore = getScore(newNumbers, HighestNumber)
        prevNumbers = getPrevNumbers(
          Numbers,
          PrevNumbers,
          PrevPrevNumbers,
          newNumbers
        )
        prevPrevNumbers = getPrevPrevNumbers(
          Numbers,
          PrevNumbers,
          PrevPrevNumbers,
          newNumbers
        )
      } else {
        newNumbers = Numbers
        isPlaying = false
        prevNumbers = state.PrevNumbers
        prevPrevNumbers = state.PrevPrevNumbers
      }

      return {
        ...state,
        IsPlaying: isPlaying,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
      }

    case GOLEFT:
      sort(Numbers)
      PositionOfNextCell = -1
      newNumbers = move(Numbers, firstRowLeft, PositionOfNextCell)
      if (newNumbers) {
        newScore = getScore(newNumbers, HighestNumber)
        prevNumbers = getPrevNumbers(
          Numbers,
          PrevNumbers,
          PrevPrevNumbers,
          newNumbers
        )
        prevPrevNumbers = getPrevPrevNumbers(
          Numbers,
          PrevNumbers,
          PrevPrevNumbers,
          newNumbers
        )
      } else {
        newNumbers = Numbers
        isPlaying = false
        prevNumbers = state.PrevNumbers
        prevPrevNumbers = state.PrevPrevNumbers
      }

      return {
        ...state,
        IsPlaying: isPlaying,
        Numbers: newNumbers,
        PrevNumbers: prevNumbers,
        PrevPrevNumbers: prevPrevNumbers,
        HighestNumber: newScore
      }

    case UNDO:
      isPlaying = true
      let amountsOfUnDos = state.AmountOfUnDos - 1
      let newNumbersAfterUndo = state.Numbers
      if (amountsOfUnDos >= 0) {
        newNumbersAfterUndo = state.PrevNumbers
      }
      if (arraysAreEqual(Numbers, PrevNumbers)) {
        newNumbersAfterUndo = PrevPrevNumbers
        if (Numbers.length === 2) {
          newNumbersAfterUndo = state.Numbers
          amountsOfUnDos = amountsOfUnDos + 1
        }
      }

      return {
        ...state,
        IsPlaying: isPlaying,
        Numbers: newNumbersAfterUndo,
        AmountOfUnDos: amountsOfUnDos,
        PrevPrevNumbers: []
      }

    default:
      return state
  }
}

export default reducer
