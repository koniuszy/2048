import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Game from './components/game'
import { connect } from 'react-redux'
import { move } from './redux/actions'
import { GODOWN, GOUP, GORIGHT, GOLEFT } from './redux/constants'
import { ANIMATIONTIME } from './utils/constants'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #222;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 0.5em;
  } 
  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 5px;
  }
`

const Page = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;
  max-width: 100vw;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
`

class App extends React.Component {
  state = {
    ready: true
  }
  componentDidMount() {
    window.addEventListener('keydown', this.checkKeyPress)
  }

  checkKeyPress = e => {
    e.preventDefault() // scrolling
    if (this.state.ready) {
      let isArrow = false
      const key = e.key
      if (key === 'ArrowDown') {
        this.props.move(GODOWN)
        isArrow = true
      } else if (key === 'ArrowUp') {
        this.props.move(GOUP)
        isArrow = true
      } else if (key === 'ArrowLeft') {
        isArrow = true
        this.props.move(GOLEFT)
      } else if (key === 'ArrowRight') {
        isArrow = true
        this.props.move(GORIGHT)
      }
      if (isArrow) {
        this.setState(
          {
            ready: false
          },
          () => {
            setTimeout(() => {
              this.setState({
                ready: true
              })
            }, ANIMATIONTIME * 2)
          }
        )
      }
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
  { move }
)(App)
