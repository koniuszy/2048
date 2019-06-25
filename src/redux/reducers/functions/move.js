import {
  getFullCells,
  arraysAreEqual,
  getEmptyCells,
  getRandomNumberOfArray,
  getRandomValue,
  getPositionForAnimation
} from './game'
import { ROW, NUMBEROFCELLS } from '../../../utils/numberOfCells'
import { NEWGAME, MERGE, WILLMERGE } from '../../constants'

export const move = (prevNumbers, positionCanMove, PositionOfNextCell) => {
  let shouldMerge = false
  let mergedAlready = false
  let emptyCells = []
  let newNumber = []
  let newNumbers = []
  let positionsOfMergedNumbers = []
  let position
  let value
  let Numbers = []

  // eslint-disable-next-line
  prevNumbers.map(number => {
    if (number[3] !== WILLMERGE) {
      Numbers.push(number)
    }
  })

  let fullCells = getFullCells(Numbers)

  for (let i = 0; i < Numbers.length; i++) {
    position = Numbers[i][0]
    value = Numbers[i][1]
    let positionOfNextNumber = false
    newNumber = []
    let positionForAnimation
    let numberWillMerge = []

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

      if (positionOfNextNumber !== false) {
        for (let i = 0; i < newNumbers.length; i++) {
          if (
            newNumbers[i][0] === positionOfNextNumber &&
            newNumbers[i][1] === value
          ) {
            if (positionsOfMergedNumbers.includes(positionOfNextNumber)) {
              mergedAlready = true
            }
            if (!mergedAlready) {
              shouldMerge = true
              value = newNumbers[i][1] * 2
              newNumbers[i][1] = value
              newNumbers[i][3] = MERGE
              positionForAnimation = getPositionForAnimation(
                newNumbers[i][0],
                position
              )
              numberWillMerge.push(
                position + NUMBEROFCELLS,
                value / 2,
                positionForAnimation,
                WILLMERGE
              )
              newNumbers.push(numberWillMerge)
              positionsOfMergedNumbers.push(newNumbers[i][0])
              i = newNumbers.length + 1
            }
          }
        }
        if (!shouldMerge) {
          position = positionOfNextNumber - PositionOfNextCell
        }
      } else if (!positionOfNextNumber) {
        while (positionCanMove(position)) {
          position = position + PositionOfNextCell
        }
      }
    }
    if (!shouldMerge) {
      positionForAnimation = getPositionForAnimation(Numbers[i][0], position)
      newNumber.push(position, value, positionForAnimation)
      newNumbers.push(newNumber)
    }
    mergedAlready = false
    shouldMerge = false
    fullCells = getFullCells(newNumbers)
  }

  // create new Number
  if (!arraysAreEqual(newNumbers, Numbers)) {
    emptyCells = getEmptyCells(fullCells)
    position = emptyCells[getRandomNumberOfArray(emptyCells)]
    value = getRandomValue()

    newNumber = []
    newNumber.push(position)
    newNumber.push(value)
    newNumber.push(NEWGAME)
    newNumbers.push(newNumber)
  }
  return newNumbers
}
