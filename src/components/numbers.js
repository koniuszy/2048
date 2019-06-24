import React from 'react'
import media from '../media-query/media'
import pixToRem from '../utils/pixToRem'
import styled from 'styled-components'

import { ANIMATIONTIME, EXTEND } from '../utils/constants'
import { GlobalCell } from '../utils/globalCell'
import { connect } from 'react-redux'
import { NEWGAME, MERGE } from '../redux/constants'
import { create, merge } from './animations/numbers'

const Cell = styled(GlobalCell)`
  justify-content: center;
  align-items: center;
  font-weight: 700;
  text-align: center;
  user-select: none;
  transition: margin ${ANIMATIONTIME}ms ease-in,
    width ${ANIMATIONTIME}ms ease-in, height ${ANIMATIONTIME}ms ease-in;

  display: ${props => props.display};
  animation: ${props => props.animation} ${ANIMATIONTIME}ms ease-in;
  ${props => props.cellStyles};

  ${media.lessThan('xSmall')`
    font-size: ${pixToRem(28)} !important;
  `}

  ${media.between('xSmall', 'small')`
    ${props => (props.extend ? EXTEND : '')}
    font-size: ${pixToRem(28)};
  `}
`

class Numbers extends React.Component {
  state = {
    value: null,
    animation: 'none',
    cellStyles: ''
  }
  componentDidMount() {
    if (localStorage.getItem('persist:numbers') !== null) {
      this.fillCells()
    }
  }

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = true
    // eslint-disable-next-line
    nextProps.numbers.map(number => {
      if (
        number[0] === this.props.position &&
        number[1] === this.state.value &&
        number[2] !== NEWGAME &&
        number[2] !== MERGE &&
        nextProps.extend === this.props.extend
      ) {
        shouldUpdate = false
      }
    })
    return shouldUpdate
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.numbers !== null &&
      prevProps.numbers !== this.props.numbers
    ) {
      this.fillCells()
    }
  }

  closeAnimation = () => {
    setTimeout(() => {
      this.setState({
        animation: 'none'
      })
    }, ANIMATIONTIME)
  }

  fillCells = () => {
    // this.props.numbers => array[i][0] position (0-15) array[i][1] value (initial 2 or 4) array[i][2] type of animation
    const { position, numbers } = this.props
    const none = 'none'
    const flex = 'flex'
    let numberExist = false
    let animation = none
    let cellStyles

    // eslint-disable-next-line
    numbers.map(number => {
      if (number[0] === position) {
        numberExist = number
      }
    })

    // eslint-disable-next-line
    if (numberExist) {
      let fontColor = 'black'
      let shadow = 'none'
      let size = pixToRem(48)
      let color
      let margin = '0 0 0 0'

      if (numberExist[2] === NEWGAME) {
        animation = create
      } else if (numberExist[2] === MERGE) {
        animation = merge
      } else {
        margin = numberExist[2]
      }

      let colorNumber = 0
      let shadowNumber = 0
      let numberValue = numberExist[1]

      while (numberValue > 2) {
        numberValue = numberValue / 2
        if (colorNumber <= 12) {
          colorNumber++
        } else {
          numberValue = 1
        }
        if (colorNumber >= 8) {
          shadowNumber++
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
      const shadows = [
        '',
        '0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)',
        '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)',
        '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.32571)',
        '0px 0px 20px 20px rgba(245, 0, 0, 0.47619), inset 0 0 0 1px rgba(173, 0, 0, 0.4571)',
        '0px 0px 20px 20px rgba(0, 0, 0, 0.47619), inset 0 0 0 1px rgba(0, 0, 0, 0.4571)'
      ]
      if (numberExist[1] >= 8) {
        fontColor = 'white'
      }
      if (numberExist[1] >= 1024) {
        size = pixToRem(35)
      }
      color = [colors[colorNumber]]
      shadow = shadows[shadowNumber]
      cellStyles = `background-color: ${color}; box-shadow: ${shadow}; display: ${flex}; color: ${fontColor}; font-size: ${size}; margin: ${margin}`

      this.setState(
        {
          value: numberExist[1],
          animation: animation,
          cellStyles: cellStyles
        },
        this.closeAnimation
      )
    } else {
      //first animation then display none
      cellStyles = `display: ${none};`
      this.setState({
        cellStyles: cellStyles,
        value: null
      })
    }
  }

  render() {
    return (
      <Cell
        extend={this.props.extend}
        cellStyles={this.state.cellStyles}
        animation={this.state.animation}
      >
        {this.state.value}
      </Cell>
    )
  }
}

const mapStateToProps = state => {
  return {
    numbers: state.game.Numbers
  }
}

export default connect(mapStateToProps)(Numbers)
