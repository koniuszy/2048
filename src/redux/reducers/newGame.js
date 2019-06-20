import { NEWGAME, GODOWN } from "../constants"
import { NUMBEROFCELLS } from "../../utils/numberOfCells"

const getEmptyCells = () => {
  const cells = []
  for (let i = 0; i < NUMBEROFCELLS; i++) {
    cells.push(i)
  }
  return cells
}

// 2 or 4 value
const getRandomValue = () => {
  return Math.floor(Math.random() * 2 + 1) * 2
}

const getRandomNumberOfArray = emptyCells => {
  return Math.floor(Math.random() * (emptyCells.length - 1))
}

const initialStates = {
  Numbers: [],
  EmptyCells: getEmptyCells()
}

const reducer = (state = initialStates, action) => {
  let newEmptyCells = []
  let newNumbers = []
  const { Numbers, EmptyCells } = state
  const vertically = Math.sqrt(NUMBEROFCELLS)

  let shouldMerge = false

  switch (action.type) {
    case NEWGAME:
      let emptyCells = getEmptyCells()

      for (let i = 0; i < action.payload.amount; i++) {
        let PositionAndValue = []
        const randomPosition = getRandomNumberOfArray(emptyCells)
        const position = emptyCells[randomPosition]
        const randomValue = getRandomValue()

        emptyCells[randomPosition] = emptyCells[emptyCells.length - 1]
        emptyCells.pop()
        PositionAndValue.push(position)

        if (i !== 0 && newNumbers[0][1] === "4") {
          PositionAndValue.push("2")
        } else {
          PositionAndValue.push(randomValue.toString())
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
      let fullPositions = fullCells

      //descending by position
      Numbers.sort(function(a, b) {
        return b[0] - a[0]
      })

      //moving down all Numbers
      for (let i = 0; i < Numbers.length; i++) {
        let position = Numbers[i][0]
        let value = Numbers[i][1]
        let newNumber = []

        let positionOfNext = -1

        if (position <= 11) {
          for (let i = 1; i < vertically; i++) {
            if (fullCells.includes(position + 4 * i)) {
              positionOfNext = position + 4 * i
              i = vertically + 1
            }
          }

          for (let i = 0; i < newNumbers.length; i++) {
            if (
              newNumbers[i][0] === positionOfNext &&
              newNumbers[i][1] === value
            ) {
              console.log("opcja druga")
              shouldMerge = true
              newNumbers[i][1] = (parseInt(newNumbers[i][1], 10) * 2).toString()
            }
          }

          for (let i = 0; i < Numbers.length; i++) {
            if (Numbers[i][0] === positionOfNext && Numbers[i][1] === value) {
              value = parseInt(Numbers[i][1], 10) * 2
              console.log(value)
              value.toString()
              console.log(value)
              shouldMerge = true
              newNumber.push(Numbers[i][0])
              newNumber.push(value)
              newNumbers.push(newNumber)
            }
          }

          if (positionOfNext > 0) {
            if (shouldMerge) {
              console.log("bedzie mergowanie")
            } else {
              console.log("nie bedzie mergowania")
              position = positionOfNext - 4
              newNumber.push(position)
              newNumber.push(value)
              newNumbers.push(newNumber)
            }
          } else if (positionOfNext === -1) {
            fullCells = []
            for (let i = 0; i < fullPositions.length; i++) {
              if (fullPositions[i] !== position) {
                fullCells.push(fullPositions[i])
              }
            }
            while (position <= 11) {
              position = position + 4
            }
            newNumber.push(position)
            newNumber.push(value)
            newNumbers.push(newNumber)
            fullCells.push(position)
            fullPositions = fullCells
          }
        } else {
          newNumber.push(position)
          newNumber.push(value)
          newNumbers.push(newNumber)
        }

        // Defeat
        if (position < 0) {
          console.log("Defeat")
          newNumbers = "Defeat"
        }
      }

      // we need to save new emptyCells array after we move numbers down
      EmptyCells.map(el => {
        if (!fullPositions.includes(el)) {
          newEmptyCells.push(el)
        }
      })
      //then we need to add one more Number and reduce emptyCells array!

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
