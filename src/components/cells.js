import React, { Component } from 'react'
import styled from 'styled-components'
import Numbers from './numbers'
import media from '../media-query/media'

import { ANIMATIONTIME, EXTENDSMALL, EXTEND } from '../utils/constants'
import { GlobalCell } from '../utils/globalCell'
import { connect } from 'react-redux'
import { newGame, move } from '../redux/actions'
import { NUMBEROFCELLS } from '../utils/numberOfCells'

const CellWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 21%;
`

const CellShadow = styled(GlobalCell)`
  background: rgba(238, 228, 218, 0.35);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width ${ANIMATIONTIME}ms ease-in,
    height ${ANIMATIONTIME}ms ease-in;

  ${media.between('xSmall', 'small')`
    ${props => (props.extend ? EXTEND : '')}
  `}

  ${media.lessThan('xSmall')`
    ${props => (props.extend ? EXTENDSMALL : '')}
  `}
`

class Cells extends Component {
  componentDidMount() {
    if (localStorage.getItem('persist:numbers') === null) {
      this.props.newGame(2)
    }
  }
  makeCellsShadow = () => {
    const backgroundForCells = []
    for (let i = 0; i < NUMBEROFCELLS; i++) {
      backgroundForCells.push(
        <CellWrapper key={i}>
          <CellShadow extend={this.props.extend}>
            <Numbers extend={this.props.extend} position={i} />
          </CellShadow>
        </CellWrapper>
      )
    }
    return backgroundForCells
  }

  render() {
    return <>{this.makeCellsShadow()}</>
  }
}

export default connect(
  null,
  { newGame, move }
)(Cells)
