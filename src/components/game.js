import React from 'react'
import media from '../media-query/media'
import Cells from './cells'
import pixToRem from '../utils/pixToRem'
import Swipe from 'react-easy-swipe'
import styled, { css } from 'styled-components'

import { connect } from 'react-redux'
import { newGame, move } from '../redux/actions'
import { UNDO } from '../redux/constants'
import { GOUP, GODOWN, GOLEFT, GORIGHT } from '../redux/constants'
import { ANIMATIONTIME, EXTENDEDCONTAINER } from '../utils/constants'

const backgroundColor = css`
  background-color: #bbada1;
`

const GameWindowContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  transition: width ${ANIMATIONTIME}ms ease-in,
    height ${ANIMATIONTIME}ms ease-in;

  ${media.lessThan('xSmall')`
    margin-bottom: 10px;
    width: 280px;
     height: 280px;
  `}

  ${media.between('xSmall', 'small')`
    padding: 0;
    margin-bottom: 10px;
    width: 280px;
     height: 280px;
      ${props => props.fullScreen}
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

  ${media.lessThan('small')`
   margin: 10px 0 0 0 ;
  `}
`

const GameTitle = styled.h1`
  font-size: ${pixToRem(64)};
  opacity: 0.7;
  color: white;
  letter-spacing: 15px;

  ${media.lessThan('small')`
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
  user-select: none;

  ${media.lessThan('small')`
    margin: 10px 5px 10px 5px;
  `}

  ${props => props.styles}
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
  user-select: none;

  ::after {
    content: '';
    width: 90%;
    height: 2px;
    background-color: #bbada1;
    position: relative;
    left: 5%;
    display: block;
    top: 20px;
  }

  ${media.lessThan('small')`
    text-align: center;
    margin-left: 15px;
    margin-right: 15px;
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
  ${media.lessThan('small')`
    order: -2;
    margin-bottom: 15px;
  `}
`

const TitleWrapper = styled(Wrapper)`
  ${media.lessThan('small')`
    order: -3;
    margin-top: 15px;
    margin-bottom: 15px;
  `}
`

const Contact = styled(Wrapper)`
  width: 500px;
  justify-content: space-around;
  opacity: 0.8;
  margin: 10px;
`

const Extender = styled.svg`
  position: absolute;
  bottom: -25px;
  right: 5px;
  width: 20px;
  height: 20px;
  fill: #87705f;
  cursor: pointer;
  display: none;

  ${media.lessThan('xSmall')`
    display: none;
  `};

  ${media.between('xSmall', 'small')`
    display: block;
  `};
`

class Game extends React.Component {
  state = {
    isSwaping: false,
    fullScreen: '',
    extend: false
  }

  componentDidMount() {
    document.getElementById('GameWindow').addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault()
      },
      { passive: false }
    )
  }

  onSwipeMove = position => {
    if (Math.abs(position.x) > 30 || Math.abs(position.y) > 30) {
      if (this.state.isSwaping === false) {
        this.setState(
          {
            isSwaping: true
          },
          () => this.move(position)
        )
      }
    }
  }

  onSwipeEnd = () => {
    this.setState({
      isSwaping: false
    })
  }

  move = position => {
    let direction
    if (Math.abs(position.x) > Math.abs(position.y)) {
      if (position.x > 0) {
        direction = GORIGHT
      } else {
        direction = GOLEFT
      }
    } else {
      if (position.y > 0) {
        direction = GODOWN
      } else {
        direction = GOUP
      }
    }
    this.props.move(direction)
  }

  disableButton = () => {
    if (
      this.props.undo > 0 &&
      this.props.numbers !== this.props.prevNumbers &&
      this.props.numbers !== this.props.prevPrevNumbers
    ) {
      return false
    } else {
      return true
    }
  }

  getButtonStyles = () => {
    if (
      this.props.undo > 0 &&
      this.props.numbers !== this.props.prevNumbers &&
      this.props.numbers !== this.props.prevPrevNumbers
    ) {
      return ''
    } else {
      return `opacity: 0.5; cursor: default;`
    }
  }

  extend = () => {
    if (!this.state.extend) {
      this.setState({
        fullScreen: EXTENDEDCONTAINER,
        extend: true
      })
    } else {
      this.setState({
        fullScreen: '',
        extend: false
      })
    }
  }

  render() {
    return (
      <>
        <TitleWrapper>
          <GameTitle>4096</GameTitle>
          <BestScore>
            <Title>best merge</Title>
            <HighestNumber>{this.props.highestNumber}</HighestNumber>
          </BestScore>
        </TitleWrapper>
        <Swipe
          onSwipeStart={this.onSwipeStart}
          onSwipeMove={this.onSwipeMove}
          onSwipeEnd={this.onSwipeEnd}
        >
          <GameWindowContainer>
            <GameWindow fullScreen={this.state.fullScreen} id='GameWindow'>
              <Cells extend={this.state.extend} />
              <Extender viewBox='0 0 438 438' onClick={this.extend}>
                <path
                  d='M407.42,159.029c3.62,3.616,7.898,5.428,12.847,5.428c2.282,0,4.668-0.476,7.139-1.429
                c7.426-3.235,11.136-8.853,11.136-16.846V18.276c0-4.949-1.807-9.231-5.428-12.847c-3.61-3.617-7.898-5.424-12.847-5.424H292.36
                c-7.991,0-13.607,3.805-16.848,11.419c-3.23,7.423-1.902,13.99,4,19.698l41.111,41.112L219.271,173.589L117.917,72.231
                l41.112-41.112c5.901-5.708,7.232-12.275,3.999-19.698C159.789,3.807,154.175,0,146.182,0H18.276C13.324,0,9.041,1.809,5.425,5.426
                c-3.617,3.616-5.424,7.898-5.424,12.847v127.907c0,7.996,3.809,13.61,11.419,16.846c2.285,0.948,4.57,1.429,6.855,1.429
                c4.948,0,9.229-1.812,12.847-5.427l41.112-41.109l101.354,101.354L72.234,320.622l-41.112-41.113
                c-5.711-5.903-12.275-7.231-19.702-4.001c-7.614,3.241-11.419,8.856-11.419,16.854v127.906c0,4.948,1.807,9.229,5.424,12.847
                c3.619,3.614,7.902,5.421,12.851,5.421h127.906c7.996,0,13.61-3.806,16.846-11.416c3.234-7.427,1.903-13.99-3.999-19.705
                l-41.112-41.106L219.271,264.95l101.353,101.361l-41.114,41.11c-5.899,5.708-7.228,12.279-3.997,19.698
                c3.237,7.617,8.856,11.423,16.851,11.423h127.907c4.948,0,9.232-1.813,12.847-5.428c3.613-3.613,5.42-7.898,5.42-12.847V292.362
                c0-7.994-3.709-13.613-11.136-16.851c-7.802-3.23-14.462-1.903-19.985,4.004l-41.106,41.106L264.952,219.271L366.31,117.917
                L407.42,159.029z'
                />
              </Extender>
            </GameWindow>
          </GameWindowContainer>
        </Swipe>
        <ButtonsWrapper>
          <Button
            styles={this.getButtonStyles()}
            disabled={this.disableButton()}
            onClick={() => this.props.move(UNDO)}
          >
            Undo: {this.props.undo}
          </Button>
          <Button onClick={() => this.props.newGame(2)}>New Game</Button>
        </ButtonsWrapper>
        <Wrapper>
          <HowToPlay>
            HOW TO PLAY: Use your arrow keys to move the tiles. On a phone add
            to your home screen and swipe. When two tiles with the same number
            touch, they merge into one!
          </HowToPlay>
        </Wrapper>
        <Wrapper>
          <HowToPlay>
            NOTE: The game on <A href='https://play2048.co/'>play2048.co</A> is
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
          <A href='https://github.com/koniuszy'>Github</A>
          <A href='https://koniuszy.github.io/'>My website</A>
        </Contact>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    undo: state.game.AmountOfUnDos,
    numbers: state.game.Numbers,
    prevNumbers: state.game.PrevNumbers,
    prevPrevNumbers: state.game.PrevPrevNumbers,
    highestNumber: state.game.HighestNumber
  }
}

export default connect(
  mapStateToProps,
  { newGame, move }
)(Game)
