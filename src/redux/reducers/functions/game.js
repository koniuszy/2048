import { NUMBEROFCELLS, ROW } from '../../../utils/constants'

export const getFullCells = Numbers => {
  let fullCells = []
  Numbers.map(e => fullCells.push(e[0]))
  return fullCells
}

export const arraysAreEqual = (arrayX, arrayY) => {
  if (arrayX.length === arrayY.length) {
    for (let i = 0; i < arrayX.length; i++) {
      for (let c = 0; c < 2; c++) {
        // only first 2 arguments [position][value] are equal, in case of all equal -> compare Json
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

export const getPrevNumbers = (
  Numbers,
  PrevNumbers,
  PrevPrevNumbers,
  newNumbers
) => {
  let prevNumbers = Numbers

  if (PrevPrevNumbers.length > 0) {
    if (
      arraysAreEqual(Numbers, PrevNumbers) ||
      arraysAreEqual(newNumbers, Numbers)
    ) {
      prevNumbers = PrevPrevNumbers
    }
  }
  return prevNumbers
}

export const getPrevPrevNumbers = (
  Numbers,
  PrevNumbers,
  PrevPrevNumbers,
  newNumbers
) => {
  let prevPrevNumbers = PrevNumbers

  if (PrevPrevNumbers.length > 0) {
    if (
      arraysAreEqual(Numbers, PrevNumbers) ||
      arraysAreEqual(PrevNumbers, PrevPrevNumbers) ||
      arraysAreEqual(newNumbers, Numbers)
    ) {
      prevPrevNumbers = PrevPrevNumbers
    }
  }

  return prevPrevNumbers
}

export const getScore = (numbers, score) => {
  let newScore = score

  numbers.forEach(number => {
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

export const firstRowDown = position => {
  return position < NUMBEROFCELLS - ROW
}

export const firstRowLeft = position => {
  if (position === 0) {
    return false
  }
  return !(position % 4 === 0)
}

export const firstRowRight = position => {
  if (position === NUMBEROFCELLS - 1) {
    return false
  }
  return !((position + 1) % 4 === 0)
}

export const firstRowUp = position => {
  return position >= ROW
}

export const gameOver = Numbers => {
  sort(Numbers)
  let isLost = true
  Numbers.forEach((number, index) => {
    if (index > 0 && index < NUMBEROFCELLS - ROW) {
      if (number[1] === Numbers[index + ROW][1]) {
        isLost = false
      }
    }

    if (index > ROW && index < NUMBEROFCELLS) {
      if (number[1] === Numbers[index - ROW][1]) {
        isLost = false
      }
    }

    if (index % ROW !== 0 && index !== 0) {
      if (number[1] === Numbers[index - 1][1]) {
        isLost = false
      }
    }

    if ((index + 1) % ROW !== 0) {
      if (number[1] === Numbers[index + 1][1]) {
        isLost = false
      }
    }

    if (index === 0) {
      if (
        number[1] === Numbers[index + 1][1] ||
        number[1] === Numbers[index + ROW][1]
      ) {
        isLost = false
      }
    }

    if (index === NUMBEROFCELLS - 1) {
      if (
        number[1] === Numbers[index - 1][1] ||
        number[1] === Numbers[index - ROW][1]
      ) {
        isLost = false
      }
    }
  })

  return isLost
}
