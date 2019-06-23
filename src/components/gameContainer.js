import React from "react"
import media from "../media-query/media"
import styled, { css } from "styled-components"

import { connect } from "react-redux"
import { newGame, move } from "../redux/actions"
import { UNDO } from "../redux/constants"
import Cells from "./cells"
import pixToRem from "../utils/pixToRem"

const backgroundColor = css`
  background-color: #bbada1;
`

const GameWindow = styled.div`
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

  ${media.lessThan("small")`
    width: 280px;
    height: 280px;
  `}
`

const BestScore = styled.div`
  background-color: #87705f;
  width: 200px;
  height: 50px;
  border-radius: 10px;
  margin: 50px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${media.lessThan("small")`
   margin: 10px 0 0 0 ;
  `}
`

const GameTitle = styled.h1`
  font-size: ${pixToRem(64)};
  opacity: 0.7;
  color: white;
  letter-spacing: 15px;

  ${media.lessThan("small")`
    display: none;
  `}
`

const Button = styled.button`
  background-color: #87705f;
  color: white;
  margin: 50px 50px 7px 50px;
  padding: 10px;
  width: 150px;
  font-size: ${pixToRem(22)};
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;

  ${props => props.styles}

  ${media.lessThan("small")`
    margin: 10px 5px 10px 5px;
  `}
`

const Title = styled.p`
  letter-spacing: 2px;
  line-height: 15px;
  color: white;
  margin: 0;
`

const HighestNumber = styled.h2`
  width: 100%;
  letter-spacing: 4px;
  color: white;
  margin: 0;
  text-align: center;
  opacity: 0.9;
`

const HowToPlay = styled.h3`
  color: #eee4db;
  opacity: 0.8;
  width: 500px;
  line-height: 22px;
  letter-spacing: 2px;

  ::after {
    content: "";
    width: 90%;
    height: 2px;
    background-color: #bbada1;
    position: relative;
    left: 5%;
    display: block;
    top: 20px;
  }

  ${media.lessThan("small")`
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  `}
`

const A = styled.a`
  text-decoration: underline;
  color: #eee4da;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ButtonsWrapper = styled(Wrapper)`
  ${media.lessThan("small")`
    order: -2;
  `}
`

const TitleWrapper = styled(Wrapper)`
  ${media.lessThan("small")`
    order: -3;
  `}
`

const Contact = styled(Wrapper)`
  width: 500px;
  justify-content: space-around;
  opacity: 0.8;
  margin: 10px;
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
      <TitleWrapper>
        <GameTitle>4096</GameTitle>
        <BestScore>
          <Title>best merge</Title>
          <HighestNumber>{props.highestNumber}</HighestNumber>
        </BestScore>
      </TitleWrapper>
      <GameWindow>
        <Cells />
      </GameWindow>
      <ButtonsWrapper>
        <Button
          styles={getButtonStyles(props.undo, props.numbers, props.prevNumbers)}
          disabled={disableButton(props.undo, props.numbers, props.prevNumbers)}
          onClick={() => props.move(UNDO)}
        >
          Undo: {props.undo}
        </Button>
        <Button onClick={() => props.newGame(2)}>New Game</Button>
      </ButtonsWrapper>
      <Wrapper>
        <HowToPlay>
          HOW TO PLAY: Use your arrow keys or swipe to move the tiles. When two
          tiles with the same number touch, they merge into one!
        </HowToPlay>
      </Wrapper>
      <Wrapper>
        <HowToPlay>
          NOTE: The game on <A href="https://play2048.co/">play2048.co</A> is
          the original version of 2048.
        </HowToPlay>
      </Wrapper>
      <Wrapper>
        <HowToPlay>
          GOAL: You can use Undo 3 times to cancel your last move. You cannot
          use Undo twice in a row and when you start new Game. Try to achieve
          4096! After that you can continue to gather more points.
        </HowToPlay>
      </Wrapper>
      <Contact>
        <A href="https://github.com/koniuszy">Github</A>
        <A href="https://koniuszy.github.io/">My website</A>
      </Contact>
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
