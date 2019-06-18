import React, { Component } from "react"

import Cell from "./cell"

export default class Cells extends Component {
  getPlaceForCells = () => {
    const numberOfCells = 16
    const backgroundForCells = []
    for (let i = 0; i < numberOfCells; i++) {
      backgroundForCells.push(<Cell value={i} key={i} />)
    }
    return backgroundForCells
  }

  render() {
    return this.getPlaceForCells()
  }
}
