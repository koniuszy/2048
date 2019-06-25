import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import Game from './components/game'
import { connect } from 'react-redux'
import { action } from './redux/actions'
import { GODOWN, GOUP, GORIGHT, GOLEFT } from './redux/constants'
import { media } from './media-query/media'

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

  ${media.lessThan('small')`
    user-select: none;
  `};
`

class App extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkKeyPress)
  }

  checkKeyPress = e => {
    e.preventDefault()
    const key = e.key
    if (!e.repeat && this.props.isPlaying)
      if (key === 'ArrowDown') {
        this.props.action(GODOWN)
      } else if (key === 'ArrowUp') {
        this.props.action(GOUP)
      } else if (key === 'ArrowLeft') {
        this.props.action(GOLEFT)
      } else if (key === 'ArrowRight') {
        this.props.action(GORIGHT)
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
    isPlaying: state.IsPlaying
  }
}

export default connect(
  mapStateToProps,
  { action }
)(App)
