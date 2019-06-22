import React, { Component } from "react"
import styled from "styled-components"

import Numbers from "./Numbers"
import { GlobalCell } from "./styledComponents"
import { connect } from "react-redux"
import { newGame, move } from "../redux/actions"
import { NUMBEROFCELLS } from "../utils/numberOfCells"

const CellShadow = styled(GlobalCell)`
  background: rgba(238, 228, 218, 0.35);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

class Cells extends Component {
  componentDidMount() {
    if (localStorage.getItem("persist:numbers") === null) {
      this.props.newGame(2)
    }
  }
  makeCellsShadow = () => {
    const backgroundForCells = []
    for (let i = 0; i < NUMBEROFCELLS; i++) {
      backgroundForCells.push(
        <CellShadow key={i}>
          <Numbers position={i} />
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
  { newGame, move }
)(Cells)
