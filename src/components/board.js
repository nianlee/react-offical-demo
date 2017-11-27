import React, { Component } from 'react'
// import Square from './square'

function Square(props) {
  return (
    <button
      className="square" 
      style = { props.style }
      onClick={ props.onClick }>
        { props.value }
    </button>
  )
}

class Board extends Component {
  renderSquare(i) {
    const winners = this.props.winners;
    let isInWinners = false;
    if (winners) {
      isInWinners = winners.indexOf(i) > -1
    }

    const winnerStyle = {
      color:  isInWinners ? 'red' : '',
    }

    return (
      <Square 
        key={ i }
        value={ this.props.squares[i] } 
        onClick={ this.props.onClick.bind(this, i) }
        style={ winnerStyle }
      />
    )
  }

  renderBoardRow() {
    let rows = []
    for(let i=0; i < 3; i++) {
      let rowContent = []
      const index = i * 3;
      for(let x = index; x < index+3; x++) {
        rowContent.push(this.renderSquare(x))
      }
      rows.push((
        <div key={ i } className="board-row">{ rowContent }</div>
      ))
    }
    return rows
  }

  render() {
    return (
      <div>
        { this.renderBoardRow() }
      </div>
    )
  }
}

export default Board;
