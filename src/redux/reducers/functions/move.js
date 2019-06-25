import {
  getFullCells,
  arraysAreEqual,
  getEmptyCells,
  getRandomNumberOfArray,
  getRandomValue,
  gameOver
} from './game'
import { ROW } from '../../../utils/constants'
import { NEWGAME, MERGE } from '../../constants'

export const move = (Numbers, positionCanMove, PositionOfNextCell) => {
  let fullCells = getFullCells(Numbers)
  let shouldMerge = false
  let mergedAlready = false
  let emptyCells = getEmptyCells(fullCells)
  let newNumber = []
  let newNumbers = []
  let positionsOfMergedNumbers = []

  let position
  let value

  // merge or move number
  for (let i = 0; i < Numbers.length; i++) {
    position = Numbers[i][0]
    value = Numbers[i][1]
    newNumber = []
    let positionOfNextNumber = false

    if (positionCanMove(position)) {
      for (let q = 1; q < ROW; q++) {
        if (fullCells.includes(position + PositionOfNextCell * q)) {
          positionOfNextNumber = position + PositionOfNextCell * q
          q = ROW + 1
        }
        if (!positionCanMove(position + PositionOfNextCell * q)) {
          q = ROW + 1
        }
      }

      // MERGE
      if (positionOfNextNumber !== false) {
        for (let q = 0; q < newNumbers.length; q++) {
          if (
            newNumbers[q][0] === positionOfNextNumber &&
            newNumbers[q][1] === value
          ) {
            // it cannot be marged twice => [2] [2] [4] [8] (to left) should get [4] [4] [8] []
            if (positionsOfMergedNumbers.includes(positionOfNextNumber)) {
              mergedAlready = true
            }
            if (!mergedAlready) {
              shouldMerge = true
              value = newNumbers[q][1] * 2
              newNumbers[q][1] = value
              newNumbers[q][2] = MERGE
              positionsOfMergedNumbers.push(newNumbers[q][0])
              q = newNumbers.length + 1
            }
          }
        }
        //move and do not merge
        if (!shouldMerge) {
          position = positionOfNextNumber - PositionOfNextCell
        }
      } else if (!positionOfNextNumber) {
        // move to the very end
        while (positionCanMove(position)) {
          position = position + PositionOfNextCell
        }
      }
    } // number remain the same, position cannot move
    if (!shouldMerge) {
      newNumber.push(position, value)
      newNumbers.push(newNumber)
    }
    mergedAlready = false
    shouldMerge = false
    fullCells = getFullCells(newNumbers)
  }

  // create new random Number
  if (!arraysAreEqual(newNumbers, Numbers)) {
    emptyCells = getEmptyCells(fullCells)
    position = emptyCells[getRandomNumberOfArray(emptyCells)]
    value = getRandomValue()

    newNumber = []
    newNumber.push(position, value, NEWGAME)
    newNumbers.push(newNumber)
  } else if (emptyCells.length === 0 && gameOver(Numbers)) {
    newNumbers = false
  }
  return newNumbers
}
