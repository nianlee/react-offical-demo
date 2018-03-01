import React, { Component } from 'react'
import Board from './board'
import './main.css'


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends Component {
  constructor() {
    super()
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history
    const last = history[history.length - 1]
    let squares = last.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = 'X'
    this.setState({
      history: history.concat({squares}),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false: true
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]

    const winner = calculateWinner(current.squares)
    let status
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = (this.state.xIsNext ? 'Next player: X' : 'Next player: O');
    }

    const moves = history.map((move, step) => {
      const desc = move ?
        'Move #' + step :
        'Game start'

      return (
        <li key={step}>
          <a href="#" onClick={() => this.jumpTo(step)}>{desc}</a>
        </li>
      )
    })



    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = { current.squares }
            changeX = { (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game