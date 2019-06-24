import React from 'react'
import media from '../media-query/media'
import pixToRem from '../utils/pixToRem'
import styled, { keyframes } from 'styled-components'

import { ANIMATIONTIME, EXTENDSMALL, EXTEND } from '../utils/constants'
import { GlobalCell } from '../utils/globalCell'
import { connect } from 'react-redux'
import { NEWGAME } from '../redux/constants'

const Cell = styled(GlobalCell)`
  justify-content: center;
  align-items: center;
  align-content: center;
  transition: top ${ANIMATIONTIME}ms linear, left ${ANIMATIONTIME}ms ease-in,
    width ${ANIMATIONTIME}ms ease-in, height ${ANIMATIONTIME}ms ease-in;
  top: 0;
  left: 0;

  display: ${props => props.display};
  animation: ${props => props.animation} ${ANIMATIONTIME}ms ease-in;
  ${props => props.cellStyles};

  ${media.between('xSmall', 'small')`
    ${props => (props.extend ? EXTEND : '')}
  `}

  ${media.lessThan('xSmall')`
    ${props => (props.extend ? EXTENDSMALL : '')}
  `}
`

const Value = styled.h3`
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
  user-select: none;

  ${props => props.textStyles};

  ${media.lessThan('small')`
    font-size: ${pixToRem(28)};
  `}
`

const create = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }
  90% {
    width: 110%;
    height: 115%;
  }
  100% {
    width: 100%;
    height: 105%;
  }
`

class Numbers extends React.Component {
  state = {
    value: null,
    animation: 'none',
    textStyles: '',
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
    let textStyles

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
      if (numberExist[2] === NEWGAME) {
        animation = create
      } else if (!numberExist[2]) {
        // console.log(number[2])
        // animation
      }

      let colorNumber = 0
      let shadowNumber = 0
      let numberValue = numberExist[1]

      while (numberValue > 2) {
        numberValue = numberValue / 2
        if (colorNumber <= 11) {
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
        '#fcf00f'
      ]
      const shadows = [
        '',
        '0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)',
        '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)',
        '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.32571)',
        '0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.4571)'
      ]
      if (numberExist[1] >= 8) {
        fontColor = 'white'
      }
      if (numberExist[1] >= 1024) {
        size = pixToRem(35)
      }
      color = [colors[colorNumber]]
      shadow = shadows[shadowNumber]
      cellStyles = `background-color: ${color}; box-shadow: ${shadow}; display: ${flex};`
      textStyles = `color: ${fontColor}; font-size: ${size};`

      this.setState(
        {
          value: numberExist[1],
          animation: animation,
          textStyles: textStyles,
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
        <Value textStyles={this.state.textStyles}>{this.state.value}</Value>
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
