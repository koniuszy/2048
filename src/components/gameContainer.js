import React from "react"
import styled, { css } from "styled-components"

import { connect } from "react-redux"
import { newGame, move } from "../redux/actions"
import { UNDO } from "../redux/constants"
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const GameTitle = styled.h1`
  font-size: ${pixToRem(64)};
  opacity: 0.7;
  color: white;
  letter-spacing: 15px;
`

const Button = styled.button`
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

  ${props => props.styles}
`

const Title = styled.p`
  letter-spacing: 2px;
  line-height: 15px;
  color: #eee4da;
  margin: 0;
`

const HighestNumber = styled.h2`
  width: 100%;
  letter-spacing: 4px;
  color: white;
  margin: 0;
  text-align: center;
`

const disableButton = (undo, numbers, prevNumbers) => {
  if (undo > 0 && numbers !== prevNumbers) {
    return false
  } else {
    return true
  }
}

const getButtonStyles = (undo, numbers, prevNumbers) => {
  if (undo > 0 && numbers !== prevNumbers) {
    return ""
  } else {
    return `opacity: 0.5; cursor: default;`
  }
}

const Game = props => {
  return (
    <>
      <Wrapper>
        <GameTitle>2048</GameTitle>
        <BestScore>
          <Title>best merge</Title>
          <HighestNumber>{props.highestNumber}</HighestNumber>
        </BestScore>
      </Wrapper>
      <Container>
        <Cells />
      </Container>
      <Wrapper>
        <Button
          styles={getButtonStyles(props.undo, props.numbers, props.prevNumbers)}
          disabled={disableButton(props.undo, props.numbers, props.prevNumbers)}
          onClick={() => props.move(UNDO)}
        >
          Undo: {props.undo}
        </Button>
        <Button onClick={() => props.newGame(2)}>New Game</Button>
      </Wrapper>
    </>
  )
}

const mapStateToProps = state => {
  return {
    undo: state.game.AmountOfUnDos,
    numbers: state.game.Numbers,
    prevNumbers: state.game.PrevNumbers,
    highestNumber: state.game.HighestNumber
  }
}

export default connect(
  mapStateToProps,
  { newGame, move }
)(Game)
