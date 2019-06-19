import React, { Component } from "react"
import styled from "styled-components"

import Numbers from "./Numbers"
import { GlobalCell } from "./styledComponents"
import { connect } from "react-redux"
import { newGame } from "../redux/actions"
import { NUMBEROFCELLS } from "../utils/numberOfCells"

const CellShadow = styled(GlobalCell)`
  background: rgba(238, 228, 218, 0.35);
`

class Cells extends Component {
  componentDidMount() {
    this.props.newGame()
  }
  makeCellsShadow = () => {
    const backgroundForCells = []
    for (let i = 0; i < NUMBEROFCELLS; i++) {
      backgroundForCells.push(
        <CellShadow key={i}>
          <Numbers value={i} />
        </CellShadow>
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
  { newGame }
)(Cells)
