import React from "react"
import styled from "styled-components"

import { GlobalCell } from "./styledComponents"
import pixToRem from "../utils/pixToRem"
import { connect } from "react-redux"

const Cell = styled(GlobalCell)`
  position: absolute;
  justify-content: center;
  align-items: center;
  align-content: center;

  background-color: #eee4db;
  display: ${props => props.display};
`

const Value = styled.h3`
  font-size: ${pixToRem(54)};
  font-weight: 700;
  opacity: 0.7;
  margin: 0;
  padding: 0;
  text-align: center;
  user-select: none;
`

class Numbers extends React.Component {
  state = {
    display: "none",
    value: null
  }

  componentDidUpdate(prevProps, prevState) {
    this.newGame(prevState)
  }

  newGame = prevState => {
    const {
      value,
      NewGameFirstNumberPositionAndValue,
      NewGameSecondNumberPositionAndValue
    } = this.props
    const none = "none"
    const flex = "flex"
    let positions = []
    positions.push(NewGameFirstNumberPositionAndValue[0])
    positions.push(NewGameSecondNumberPositionAndValue[0])

    if (prevState.display === none && positions.includes(value)) {
      let numberValue
      if (NewGameFirstNumberPositionAndValue[0] === value) {
        numberValue = NewGameFirstNumberPositionAndValue[1]
      } else {
        numberValue = NewGameSecondNumberPositionAndValue[1]
      }
      this.setState({
        display: flex,
        value: numberValue
      })
    } else if (prevState.display === flex && !positions.includes(value)) {
      this.setState({
        display: none
      })
    }
  }

  render() {
    return (
      <Cell display={this.state.display}>
        <Value>{this.state.value}</Value>
      </Cell>
    )
  }
}

const mapStateToProps = state => ({
  NewGameFirstNumberPositionAndValue: state.NewGameFirstNumberPositionAndValue,
  NewGameSecondNumberPositionAndValue: state.NewGameSecondNumberPositionAndValue
})

export default connect(
  mapStateToProps,
  null
)(Numbers)
