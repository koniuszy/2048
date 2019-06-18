import React from "react"
import styled, { createGlobalStyle } from "styled-components"

import Game from "./components/gameContainer"
import store from "./redux/store"
import { Provider } from "react-redux"

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

const App = () => {
  return (
    <Provider store={store}>
      <Page>
        <GlobalStyle />
        <Game />
      </Page>
    </Provider>
  )
}

export default App
