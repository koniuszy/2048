import React from 'react'
import media from '../media-query/media'
import pixToRem from '../utils/pixToRem'
import styled from 'styled-components'

import { ANIMATIONTIME, EXTEND } from '../utils/constants'
import { GlobalCell } from '../utils/globalCell'
import { connect } from 'react-redux'
import { NEWGAME, MERGE } from '../redux/constants'
import { create, merge } from './animations/numbers'
import {
  getColor,
  getShadow,
  getFontColor,
  getFontSize
} from './functions/numberStyle'

const Cell = styled(GlobalCell)`
  font-weight: 700;
  text-align: center;
  user-select: none;
  transition: margin ${ANIMATIONTIME}ms ease-in,
    width ${ANIMATIONTIME}ms ease-in, height ${ANIMATIONTIME}ms ease-in,
    background-color ${ANIMATIONTIME}ms ease-in,
    color ${ANIMATIONTIME}ms ease-in;

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
    Value: null,
    Animation: 'none',
    CellStyles: ''
  }

  componentDidMount() {
    if (localStorage.getItem('persist:numbers') !== null) {
      this.fillCells()
    }
  }

  shouldComponentUpdate(nextProps) {
    let shouldUpdate = true

    nextProps.numbers.forEach(number => {
      if (
        // if there is the same number (the same position value and animation), then we do not need to update
        number[0] === this.props.position &&
        number[1] === this.state.Value &&
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
        Animation: 'none'
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
      if (numberExist[2] === NEWGAME) {
        animation = create
      } else if (numberExist[2] === MERGE) {
        animation = merge
      }

      let value = numberExist[1]
      let color = getColor(value)
      let shadow = getShadow(value)
      let size = getFontSize(value)
      let fontColor = getFontColor(value)

      cellStyles = `background-color: ${color}; box-shadow: ${shadow}; display: ${flex}; color: ${fontColor}; font-size: ${size};`

      this.setState(
        {
          Value: value,
          Animation: animation,
          CellStyles: cellStyles
        },
        this.closeAnimation
        // when Cell receive the same animation it wont play
      )
    } else {
      cellStyles = `display: ${none};`
      this.setState({
        CellStyles: cellStyles,
        Value: null
      })
    }
  }

  render() {
    return (
      <Cell
        extend={this.props.extend}
        cellStyles={this.state.CellStyles}
        animation={this.state.Animation}
      >
        {this.state.Value}
      </Cell>
    )
  }
}

const mapStateToProps = state => {
  return {
    numbers: state.Numbers
  }
}

export default connect(mapStateToProps)(Numbers)
