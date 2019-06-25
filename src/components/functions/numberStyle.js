import pixToRem from '../../utils/pixToRem'

export const getColor = value => {
  let colorNumber = 0
  let numberValue = value
  while (numberValue > 2) {
    numberValue = numberValue / 2
    if (colorNumber < 12) {
      colorNumber++
    } else {
      numberValue = 1
    }
  }
  const colors = [
    '#eee4db',
    '#fde0c9',
    '#f2b179',
    '#f59563',
    '#f67c4f',
    '#f65e3b',
    '#fdcf72',
    '#fdcc60',
    '#fdc850',
    '#fdc53f',
    '#fdc22e',
    '#000000',
    '#ff0000'
  ]

  const color = colors[colorNumber]

  return color
}

export const getShadow = value => {
  let counter = 0
  let shadowNumber = 0
  let numberValue = value

  while (numberValue > 2) {
    numberValue = numberValue / 2
    if (counter < 12) {
      shadowNumber++
    } else {
      numberValue = 1
    }
  }
  shadowNumber = shadowNumber - 7
  if (shadowNumber < 0) {
    shadowNumber = 0
  }

  const shadows = [
    '',
    '0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)',
    '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)',
    '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.32571)',
    '0px 0px 20px 20px rgba(245, 0, 0, 0.47619), inset 0 0 0 1px rgba(173, 0, 0, 0.4571)',
    '0px 0px 20px 20px rgba(0, 0, 0, 0.47619), inset 0 0 0 1px rgba(0, 0, 0, 0.4571)'
  ]

  const shadow = shadows[shadowNumber]

  return shadow
}

export const getFontColor = value => {
  let fontColor = 'black'
  if (value >= 8) {
    fontColor = 'white'
  }
  return fontColor
}

export const getFontSize = value => {
  let size = pixToRem(48)
  if (value >= 1024) {
    size = pixToRem(35)
  }
  return size
}
