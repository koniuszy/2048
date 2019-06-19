import React from "react"
import styled from "styled-components"

import Cells from "./cells"
import pixToRem from "../utils/pixToRem"

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
  position: relative;
`

const BestScore = styled.div`
  width: 200px;
  height: 50px;
  background-color: #bbada1;
  border-radius: 10px;
  margin: 50px;
`

const ScoreWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const GameTitle = styled.h1`
  font-size: ${pixToRem(64)};
`

const NewGameWrapper = styled(ScoreWrapper)``

const NewGame = styled.button`
  margin: 50px;
`

const Game = () => {
  return (
    <>
      <ScoreWrapper>
        <GameTitle>2048</GameTitle>
        <BestScore />
      </ScoreWrapper>
      <Container>
        <Cells />
      </Container>
      <NewGameWrapper>
        <NewGame>New Game</NewGame>
      </NewGameWrapper>
    </>
  )
}

export default Game
