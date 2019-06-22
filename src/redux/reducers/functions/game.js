import { NUMBEROFCELLS, ROW } from "../../../utils/numberOfCells"
import { MERGE, NEWGAME, GORIGTH, GOLEFT, GOUP } from "../../constants"

const arraysAreEqual = (arrayX, arrayY) => {
  if (arrayX.length === arrayY.length) {
    for (let i = 0; i < arrayX.length; i++) {
      for (let c = 0; c < 2; c++) {
        if (arrayX[i][c] !== arrayY[i][c]) {
          return false
        }
      }
    }
    return true
  } else {
    return false
  }
}

const getFullCells = Numbers => {
  let fullCells = []
  Numbers.map(e => fullCells.push(e[0]))
  return fullCells
}

export const getEmptyCells = fullPositions => {
  const cells = []
  for (let i = 0; i < NUMBEROFCELLS; i++) {
    if (fullPositions) {
      if (!fullPositions.includes(i)) {
        cells.push(i)
      }
    } else {
      cells.push(i)
    }
  }
  return cells
}

// 2 or 4 value
export const getRandomValue = () => {
  return (Math.floor(Math.random() * 2 + 1) * 2).toString()
}

export const getRandomNumberOfArray = emptyCells => {
  return Math.floor(Math.random() * (emptyCells.length - 1))
}

export const move = (Numbers, positionCanMove, PositionOfNextCell) => {
  let fullCells = getFullCells(Numbers)
  let shouldMerge = false
  let mergedAlready = false
  let emptyCells = []
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
        for (let i = 0; i < newNumbers.length; i++) {
          if (
            newNumbers[i][0] === positionOfNextNumber &&
            newNumbers[i][1] === value
          ) {
            // it cannot be marged twice => [2] [2] [4] [8] (to left) should get [4] [4] [8] []
            if (positionsOfMergedNumbers.includes(positionOfNextNumber)) {
              mergedAlready = true
            }
            if (!mergedAlready) {
              shouldMerge = true
              value = parseInt(newNumbers[i][1], 10) * 2
              value = value.toString()
              newNumbers[i][1] = value
              positionsOfMergedNumbers.push(newNumbers[i][0])
              i = newNumbers.length + 1
            }
          }
        }
        //move
        if (!shouldMerge) {
          position = positionOfNextNumber - PositionOfNextCell
        }
      } else if (!positionOfNextNumber) {
        while (positionCanMove(position)) {
          position = position + PositionOfNextCell
        }
      }
    } // number remain the same
    if (!shouldMerge) {
      newNumber.push(position)
      newNumber.push(value)
      newNumbers.push(newNumber)
    }
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
