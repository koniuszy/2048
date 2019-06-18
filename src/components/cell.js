import React, { Component } from "react"
import styled from "styled-components"

const CellContainer = styled.div`
  width: 105px;
  height: 105px;
  background: rgba(238, 228, 218, 0.35);
  border-radius: 5px;
`

export default class cell extends Component {
  render() {
    return <CellContainer>{this.props.value}</CellContainer>
  }
}
