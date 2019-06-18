import React from "react"
import styled from "styled-components"

import Cells from "./cells"

const Container = styled.div`
  width: 500px;
  height: 500px;
  padding: 10px;
  border-radius: 10px;
  background-color: #bbada1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
`

const Game = () => {
  return (
    <Container>
      <Cells />
    </Container>
  )
}

export default Game
