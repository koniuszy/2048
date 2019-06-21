import { NEWGAME, GODOWN, GOUP, GOLEFT, GORIGHT } from "../constants"
import { NUMBEROFCELLS, ROW } from "../../utils/numberOfCells"

const getEmptyCells = fullPositions => {
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
const getRandomValue = () => {
  return (Math.floor(Math.random() * 2 + 1) * 2).toString()
}

const getRandomNumberOfArray = emptyCells => {
  return Math.floor(Math.random() * (emptyCells.length - 1))
}

const arraysAreEqual = (arrayX, arrayY) => {
  if (arrayX.length === arrayY.length) {
    for (let i = 0; i < arrayX.length; i++) {
      for (let c = 0; c < arrayX[i].length; c++) {
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

const move = (Numbers, positionCanMove, PositionOfNextCell) => {
  let fullCells = getFullCells(Numbers)
  let shouldMerge = false
  let emptyCells = []
  let newNumber = []
  let newNumbers = []
  let position
  let value

  for (let i = 0; i < Numbers.length; i++) {
    position = Numbers[i][0]
    value = Numbers[i][1]
    newNumber = []
    let positionOfNextNumber = false

    if (positionCanMove(position)) {
      for (let i = 1; i < ROW; i++) {
        if (fullCells.includes(position + PositionOfNextCell * i)) {
          positionOfNextNumber = position + PositionOfNextCell * i
          i = ROW + 1
        }
      }
      // MERGE
      if (positionOfNextNumber !== false) {
        for (let i = 0; i < newNumbers.length; i++) {
          if (
            newNumbers[i][0] === positionOfNextNumber &&
            newNumbers[i][1] === value
          ) {
            shouldMerge = true
            value = parseInt(newNumbers[i][1], 10) * 2
            value = value.toString()
            newNumbers[i][1] = value
            i = newNumbers.length + 1
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
      newNumber.push(position)
      newNumber.push(value)
      newNumbers.push(newNumber)
    }
    shouldMerge = false
    fullCells = getFullCells(newNumbers)
  }
  if (!arraysAreEqual(newNumbers, Numbers)) {
    emptyCells = getEmptyCells(fullCells)
    position = emptyCells[getRandomNumberOfArray(emptyCells)]
    value = getRandomValue()

    newNumber = []
    newNumber.push(position)
    newNumber.push(value)
    newNumbers.push(newNumber)
  }

  return newNumbers
}

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
        const position = emptyCells[randomPosition]

        emptyCells[randomPosition] = emptyCells[emptyCells.length - 1]
        emptyCells.pop()
        PositionAndValue.push(position)

        if (i !== 0 && newNumbers[0][1] === "4") {
          PositionAndValue.push("2")
        } else {
          PositionAndValue.push(randomValue)
        }

        newNumbers.push(PositionAndValue)
      }

      return {
        ...state,
        Numbers: newNumbers,
        EmptyCells: emptyCells
      }

    case GODOWN:
      Numbers.sort(function(a, b) {
        return b[0] - a[0]
      })
      const firstRowDown = position => {
        return position <= NUMBEROFCELLS - ROW - 1
      }
      PositionOfNextCell = 4
      newNumbers = move(Numbers, firstRowDown, PositionOfNextCell)

      return {
        ...state,
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
        ...state,
        Numbers: newNumbers
      }

    case GORIGHT:
      Numbers.sort(function(a, b) {
        return b[0] - a[0]
      })
      const firstRowRight = position => {
        return !((position + 1) % 4 === 0)
      }
      PositionOfNextCell = 1
      newNumbers = move(Numbers, firstRowRight, PositionOfNextCell)

      return {
        ...state,
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
        ...state,
        Numbers: newNumbers
      }
    default:
      return state
  }
}

export default reducer
