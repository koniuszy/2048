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

  background-color: ${props => props.color};
  display: ${props => props.display};
  box-shadow: ${props => props.shadow};
`

const Value = styled.h3`
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
  user-select: none;

  font-size: ${props => props.size};
  color: ${props => props.font};
`

class Numbers extends React.Component {
  state = {
    display: "none",
    value: null,
    color: "#eee4db",
    shadow: "none",
    font: "font",
    size: pixToRem(48)
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
        let color = "#eee4db"
        let font = "black"
        let shadow = "none"
        let size = pixToRem(48)
        if (parseInt(number[1], 10) >= 8) {
          font = "white"
        }
        switch (number[1]) {
          case "4":
            color = "#fde0c9"
            break
          case "8":
            color = "#f2b179"
            break
          case "16":
            color = "#f59563"
            break
          case "32":
            color = "#f67c4f"
            break
          case "64":
            color = "#f65e3b"
            break
          case "128":
            color = "#fdcf72"
            break
          case "256":
            color = "#fdcc60"
            break
          case "512":
            color = "#fdc850"
            shadow =
              "0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)"
            break
          case "1024":
            color = "#fdc53f"
            size = pixToRem(35)
            shadow =
              "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)"
            break
          case "2048":
            color = "#fdc22e"
            size = pixToRem(35)
            shadow =
              "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.32571)"
            break
          case parseInt(number[1] > 2048):
            size = pixToRem(35)
            color = "#fcd00f"
            shadow = shadow =
              "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.4571)"
            break
          default:
            break
        }
        this.setState({
          display: flex,
          value: number[1],
          color: color,
          shadow: shadow,
          font: font,
          size: size
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
      <Cell
        shadow={this.state.shadow}
        color={this.state.color}
        display={this.state.display}
      >
        <Value size={this.state.size} font={this.state.font}>
          {this.state.value}
        </Value>
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
