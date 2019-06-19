import React from "react"
import styled, { createGlobalStyle } from "styled-components"

import Game from "./components/gameContainer"
import { connect } from "react-redux"
import { goDown } from "./redux/actions"

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
    window.addEventListener("keyboard", this.checkKeyPress)
  }

  checkKeyPress = e => {
    const down = "ArrowDown"
    const up = "ArrowUp"
    const left = "ArrowLeft"
    const right = "ArrowRight"
    if (e.key === down) {
      this.props.goDown()
    } else if (e.key === up) {
      console.log("aaa")
    } else if (e.key === left) {
      console.log("aaa")
    } else if (e.key === right) {
      console.log("aaa")
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

export default connect(
  null,
  { goDown }
)(App)
