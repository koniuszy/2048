import React, { Component } from "react"
import styled from "styled-components"

import { connect } from "react-redux"
import { goRight } from "../redux/actions"

const Container = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  background-color: #bbada1;
`

class Game extends Component {
  render() {
    return (
      <Container>
        <h1>Elo</h1>
        {this.props.counter}
        <button onClick={() => this.props.goRight()} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter
})

export default connect(
  mapStateToProps,
  { goRight }
)(Game)
