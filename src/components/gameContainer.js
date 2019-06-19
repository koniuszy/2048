import React from "react"
import styled, { css } from "styled-components"

import { connect } from "react-redux"
import { newGame } from "../redux/actions"
import Cells from "./cells"
import pixToRem from "../utils/pixToRem"

const backgroundColor = css`
  background-color: #bbada1;
`

const Container = styled.div`
  ${backgroundColor};
  width: 500px;
  height: 500px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  position: relative;
`

const BestScore = styled.div`
  ${backgroundColor};
  width: 200px;
  height: 50px;
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
  opacity: 0.5;
`

const NewGameWrapper = styled(ScoreWrapper)``

const NewGame = styled.button`
  background-color: #8f7a68;
  color: white;
  margin: 50px;
  padding: 10px;
  width: 150px;
  font-size: ${pixToRem(22)};
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
`

const Game = props => {
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
        <NewGame onClick={() => props.newGame()}>New Game</NewGame>
      </NewGameWrapper>
    </>
  )
}

export default connect(
  null,
  { newGame }
)(Game)
