import React from "react"
import styled from "styled-components"

import { GlobalCell } from "./styledComponents"
import { connect } from "react-redux"
import pixToRem from "../utils/pixToRem"

const Cell = styled(GlobalCell)`
  position: absolute;
  font-size: ${pixToRem(54)};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  opacity: 0.7;

  background-color: #eee4db;
  display: ${props => props.display};
`

class Numbers extends React.Component {
  render() {
    const { value } = this.props
    return <Cell display="none">{value}</Cell>
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(Numbers)
