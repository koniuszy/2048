import { NUMBEROFCELLS } from '../../../utils/numberOfCells'

export const getFullCells = Numbers => {
  let fullCells = []
  Numbers.map(e => fullCells.push(e[0]))
  return fullCells
}

export const arraysAreEqual = (arrayX, arrayY) => {
  if (arrayX.length === arrayY.length) {
    for (let i = 0; i < arrayX.length; i++) {
      for (let c = 0; c < 2; c++) {
        // only first 2 are equal, in case all equal -> compare Json
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
  return Math.floor(Math.random() * 2 + 1) * 2
}

export const getRandomNumberOfArray = emptyCells => {
  return Math.floor(Math.random() * (emptyCells.length - 1))
}

export const getPrevNumbers = (Numbers, PrevNumbers, PrevPrevNumbers) => {
  let prevNumbers = Numbers
  if (PrevPrevNumbers.length > 0 && arraysAreEqual(Numbers, PrevNumbers)) {
    prevNumbers = PrevPrevNumbers
  }
  return prevNumbers
}

export const getPrevPrevNumbers = (Numbers, PrevNumbers, PrevPrevNumbers) => {
  let prevPrevNumbers = PrevNumbers
  if (PrevPrevNumbers.length > 0 && arraysAreEqual(Numbers, PrevNumbers)) {
    prevPrevNumbers = PrevPrevNumbers
  }

  return prevPrevNumbers
}

export const getScore = (numbers, score) => {
  let newScore = score

  // eslint-disable-next-line
  numbers.map(number => {
    if (score < number[1]) {
      newScore = number[1]
    }
  })
  return newScore
}

export const sort = (Numbers, desc) => {
  if (desc) {
    Numbers.sort((a, b) => {
      return b[0] - a[0]
    })
  } else {
    Numbers.sort((a, b) => {
      return a[0] - b[0]
    })
  }
}
