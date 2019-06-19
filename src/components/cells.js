import React, { Component } from "react"
import styled from "styled-components"

import Numbers from "./Numbers"
import { GlobalCell } from "./styledComponents"

const CellShadow = styled(GlobalCell)`
  background: rgba(238, 228, 218, 0.35);
`

export default class Cells extends Component {
  makeCellsShadow = () => {
    const numberOfCells = 16
    const backgroundForCells = []
    for (let i = 0; i < numberOfCells; i++) {
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
