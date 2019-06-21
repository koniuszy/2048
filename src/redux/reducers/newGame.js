import { NEWGAME, GODOWN } from "../constants"
import { NUMBEROFCELLS } from "../../utils/numberOfCells"

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
    console.log(arrayX.length)
    console.log(arrayY.length)
    return false
  }
}

const initialStates = {
  Numbers: [],
  EmptyCells: getEmptyCells()
}

const reducer = (state = initialStates, action) => {
  let newEmptyCells = []
  let newNumbers = []
  let newNumber = []
  let position
  let value
  let randomPosition
  const randomValue = getRandomValue()
  const { Numbers, EmptyCells } = state
  const vertically = Math.sqrt(NUMBEROFCELLS)
  let shouldMerge = false

  switch (action.type) {
    case NEWGAME:
      let emptyCells = getEmptyCells()

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
      let fullCells = []
      Numbers.map(e => fullCells.push(e[0]))
      //descending by position
      Numbers.sort(function(a, b) {
        return b[0] - a[0]
      })
      for (let i = 0; i < Numbers.length; i++) {
        position = Numbers[i][0]
        value = Numbers[i][1]
        newNumber = []
        let positionOfNext = -1

        if (position <= 11) {
          for (let i = 1; i < vertically; i++) {
            if (fullCells.includes(position + 4 * i)) {
              positionOfNext = position + 4 * i
              i = vertically + 1
            }
          }
          // MERGE
          if (positionOfNext !== -1) {
            for (let i = 0; i < newNumbers.length; i++) {
              if (
                newNumbers[i][0] === positionOfNext &&
                newNumbers[i][1] === value
              ) {
                shouldMerge = true
                value = parseInt(newNumbers[i][1], 10) * 2
                value = value.toString()
                newNumbers[i][1] = value
                position = null
                value = null
                i = newNumbers.length + 1
              }
            }
            if (!shouldMerge) {
              position = positionOfNext - 4
            }
            shouldMerge = false
          } else if (positionOfNext === -1) {
            while (position <= 11) {
              position = position + 4
            }
          }
        }
        if (value !== null) {
          newNumber.push(position)
          newNumber.push(value)
          newNumbers.push(newNumber)
        }
        fullCells = []
        for (let i = 0; i < newNumbers.length; i++) {
          fullCells.push(newNumbers[i][0])
        }
      }

      if (!arraysAreEqual(newNumbers, Numbers)) {
        newEmptyCells = getEmptyCells(fullCells)
        randomPosition = getRandomNumberOfArray(newEmptyCells)
        position = newEmptyCells[randomPosition]
        fullCells.push(position)
        newEmptyCells = getEmptyCells(fullCells)
        value = getRandomValue()
        newNumber = []
        newNumber.push(position)
        newNumber.push(value)
        newNumbers.push(newNumber)
      }
      return {
        ...state,
        Numbers: newNumbers,
        EmptyCells: newEmptyCells
      }
    default:
      return state
  }
}

export default reducer
