import React from "react"
import styled from "styled-components"

import { GlobalCell } from "./styledComponents"
import pixToRem from "../utils/pixToRem"
import { connect } from "react-redux"

const Cell = styled(GlobalCell)`
  position: absolute;
  font-size: ${pixToRem(54)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  opacity: 0.7;

  background-color: #eee4db;
  display: ${props => props.display};
`

class Numbers extends React.Component {
  state = {
    display: "none",
    eki: "eki"
  }

  componentDidUpdate(prevProps, prevState) {
    const { value, newGamePositionOf2Cells } = this.props
    if (
      prevState.display === "none" &&
      newGamePositionOf2Cells.includes(value)
    ) {
      console.log(2)
      this.setState({
        display: "block"
      })
    }
  }

  render() {
    return <Cell display={this.state.display} />
  }
}

const mapStateToProps = state => ({
  newGamePositionOf2Cells: state.NewGamePositionOf2Cells
})

export default connect(
  mapStateToProps,
  null
)(Numbers)
