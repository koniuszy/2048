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

  componentDidUpdate(prevProps) {
    if (
      this.props.numbers !== null &&
      prevProps.numbers !== this.props.numbers
    ) {
      this.fillCells()
    }
  }

  fillCells = () => {
    // this.props.numbers => array[i][0] position (0-15) array[i][1] value (initial 2 or 4)
    const { position, numbers } = this.props
    const { display } = this.state
    const none = "none"
    const flex = "flex"
    let numbersExist = false

    // eslint-disable-next-line
    numbers.map(number => {
      if (number[0] === position) {
        numbersExist = true
        this.setState({
          display: flex,
          value: number[1]
        })
      } else if (display === flex && !numbersExist) {
        this.setState({
          display: none,
          value: null
        })
      }
    })
  }

  render() {
    return (
      <Cell display={this.state.display}>
        <Value>{this.state.value}</Value>
      </Cell>
    )
  }
}

const mapStateToProps = state => {
  return {
    numbers: state.newGame.Numbers
  }
}

export default connect(mapStateToProps)(Numbers)
