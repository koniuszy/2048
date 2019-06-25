import React from 'react'
import media from '../media-query/media'
import pixToRem from '../utils/pixToRem'
import styled from 'styled-components'

import { ANIMATIONTIME, EXTEND } from '../utils/constants'
import { GlobalCell } from '../utils/globalCell'
import { connect } from 'react-redux'
import { NEWGAME, MERGE, WILLMERGE } from '../redux/constants'
import { create, merge } from './animations/numbers'
import {
  getColor,
  getShadow,
  getFontColor,
  getFontSize
} from './functions/numberStyle'

const Cell = styled(GlobalCell)`
  position: absolute;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  text-align: center;
  user-select: none;
  transition: left ${ANIMATIONTIME}ms ease-in, top ${ANIMATIONTIME}ms ease-in,
    background-color ${ANIMATIONTIME}ms ease-in, color ${ANIMATIONTIME}ms ease-in;

  animation: ${props => props.animation} ${ANIMATIONTIME}ms ease-in;
  ${props => props.cellStyles}
  ${props => props.newPosition}

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
    CellStyles: '',
    NewPosition: ''
  }

  componentDidMount() {
    if (localStorage.getItem('persist:numbers') !== null) {
      this.fillCells()
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true
    // eslint-disable-next-line
    nextProps.numbers.map(number => {
      if (
        number[0] === this.props.position &&
        number[1] === this.state.Value &&
        number[2] !== NEWGAME &&
        number[3] !== MERGE &&
        number[3] !== WILLMERGE &&
        nextProps.extend === this.props.extend
      ) {
        shouldUpdate = false
      }
    })

    if (this.state.NewPosition !== nextState.NewPosition) {
      shouldUpdate = true
    }

    if (this.state.Value !== null && nextState.Value === null) {
      shouldUpdate = true
    }
    return shouldUpdate
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.numbers !== null &&
      prevProps.numbers !== this.props.numbers
    ) {
      this.fillCells()
    } else if (this.state.Value !== null) {
      let numberWillStay = false
      this.props.numbers.map(number => {
        if (number[0] === this.props.position) {
          numberWillStay = true
        }
      })

      if (!numberWillStay) {
        this.setState({
          Value: null,
          CellStyles: 'display: none;'
        })
      }
    }
  }

  startRelocateNumber = (move, type) => {
    setTimeout(() => {
      let position = 'left: 0; top: 0;'
      if (type === WILLMERGE) {
        position = move
      }
      this.setState({
        NewPosition: position
      })
    }, 0)
  }

  closeAnimation = () => {
    setTimeout(() => {
      this.setState({
        Animation: 'none'
      })
    }, ANIMATIONTIME)
  }

  fillCells = () => {
    // this.props.numbers => array[i][0] position (0-15) array[i][1] value (initial 2 or 4) array[i][2] movement array[i][3] Merge ?
    const { position, numbers } = this.props
    const none = 'none'
    const flex = 'flex'
    let numberExist = false
    let animation = none
    let cellStyles
    let display = flex
    // eslint-disable-next-line
    numbers.map(number => {
      if (number[0] === position) {
        numberExist = number
      }
    })

    // eslint-disable-next-line
    if (numberExist) {
      let value = numberExist[1]
      let zIndex = 3
      let initialPosition = ''

      if (numberExist[2] === NEWGAME) {
        animation = create
        display = none
        console.log(initialPosition)
      } else if (numberExist[3] === MERGE) {
        animation = merge
        initialPosition = numberExist[2]
        value = value / 2
        zIndex = 5
      } else if (numberExist[3] === WILLMERGE) {
        initialPosition = 'left: 0; top: 0;'
      } else if (numberExist[2]) {
        initialPosition = numberExist[2]
      }

      let color = getColor(value)
      let shadow = getShadow(value)
      let size = getFontSize(value)
      let fontColor = getFontColor(value)

      if (numberExist[2] !== NEWGAME) {
        this.setState(
          {
            NewPosition: ''
          },
          () => {
            cellStyles = `z-index: ${zIndex}; background-color: ${color}; box-shadow: ${shadow}; display: ${display}; color: ${fontColor}; font-size: ${size}; ${initialPosition}`
            this.setState(
              {
                Value: value,
                CellStyles: cellStyles
              },
              () => this.startRelocateNumber(numberExist[2], numberExist[3])
            )
          }
        )
      }

      if (numberExist[3] === WILLMERGE) {
        setTimeout(() => {
          display = none
          cellStyles = `display: ${display};`
          this.setState({
            CellStyles: cellStyles,
            Value: null
          })
        }, ANIMATIONTIME)
      }

      if (numberExist[3] === MERGE || numberExist[2] === NEWGAME) {
        if (numberExist[2] === NEWGAME) {
          display = none
          cellStyles = `display: ${display};`
          this.setState({
            CellStyles: cellStyles,
            NewPosition: ''
          })
        }
        setTimeout(() => {
          if (numberExist[3] === MERGE) {
            value = value * 2
            color = getColor(value)
            shadow = getShadow(value)
            size = getFontSize(value)
            fontColor = getFontColor(value)
          }
          display = flex
          cellStyles = `z-index: ${zIndex}; background-color: ${color}; box-shadow: ${shadow}; display: ${display}; color: ${fontColor}; font-size: ${size}; ${initialPosition}`

          this.setState(
            {
              CellStyles: cellStyles,
              Animation: animation,
              Value: value
            },
            this.closeAnimation
          )
        }, ANIMATIONTIME)
      }
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
        newPosition={this.state.NewPosition}
      >
        {this.state.Value}
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
