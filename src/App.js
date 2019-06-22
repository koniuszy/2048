import React from "react"
import styled, { createGlobalStyle } from "styled-components"

import Game from "./components/gameContainer"
import { connect } from "react-redux"
import { move } from "./redux/actions"
import {
  GODOWN,
  GOUP,
  GORIGHT,
  GOLEFT,
  SAVEPREVNUMBERS
} from "./redux/constants"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  width: 100vw;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  background-color: #222;
`

class App extends React.Component {
  componentDidMount() {
    // type and function
    // https://developer.mozilla.org/en-US/docs/Web/Events ctrl + f => 	KeyboardEvent
    window.addEventListener("keydown", this.checkKeyPress)
  }

  checkKeyPress = e => {
    e.preventDefault() // scrolling
    const key = e.key
    const down = "ArrowDown"
    const up = "ArrowUp"
    const left = "ArrowLeft"
    const right = "ArrowRight"
    if (key === down) {
      this.props.move(SAVEPREVNUMBERS)
      this.props.move(GODOWN)
    } else if (key === up) {
      this.props.move(SAVEPREVNUMBERS)
      this.props.move(GOUP)
    } else if (key === left) {
      this.props.move(SAVEPREVNUMBERS)
      this.props.move(GOLEFT)
    } else if (key === right) {
      this.props.move(SAVEPREVNUMBERS)
      this.props.move(GORIGHT)
    }
  }

  render() {
    return (
      <Page>
        <GlobalStyle />
        <Game />
      </Page>
    )
  }
}

const mapStateToProps = state => {
  return {
    numbers: state.game.Numbers
  }
}

export default connect(
  mapStateToProps,
  { move }
)(App)
