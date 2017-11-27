import React, { Component } from 'react';
import Board from './board';
import './game.css'

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
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        item: squares[a],
        winners: lines[i]
      }
    }
  }
  return null;
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        location: {
          col: 0,
          row: 0
        },
        step: 0,
      }],
      numberStep: 0,
      isNextX: true,
      isToggleClick: false,
    }
  }

  jumpStep(i) {
    this.setState({
      numberStep: i,
      isNextX: i % 2 ? 'X' : 'O',
    })
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const location = {...current.location};
    location.row = Math.ceil( (i+1) / 3 );
    location.col = i%3 + 1; 

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.isNextX ? 'X' : 'O';

    this.setState({
      history: history.concat({ 
        squares: squares,
        location: location,
        step: history.length,
      }),
      numberStep: history.length,
      isNextX: !this.state.isNextX,
    })
  }

  handleAscOrDes() {
    const flag = this.state.isToggleClick;
    let history = this.state.history.slice();
    if (flag) {
      history = this.state.history.sort((a,b) => {
        return a.step - b.step;
      })
    } else {
      history = this.state.history.sort((a,b) => {
        return b.step - a.step;
      })
    }
    this.setState({
      history: history,
      isToggleClick: !this.state.isToggleClick,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.numberStep];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner.item;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    const location = `the current location col: ${current.location.col}, row: ${current.location.row}`

    const moves = history.map((steps, index) => {
      const desc = `Go to zhe move #${steps.step}, Go to game start.`
      const isBold = this.state.numberStep === steps.step;
      const style = {
        fontWeight: isBold ? 'bold' : 'normal'
      };
      
      return (
        <li key={ index }>
          <button style={ style } onClick={ this.jumpStep.bind(this, steps.step) }>{ desc }</button>
        </li>
      )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={ current.squares }
            winners= { winner && winner.winners }
            onClick={ this.handleClick.bind(this) }
          />
        </div>
        <div className="game-info">
          <div><button onClick={ this.handleAscOrDes.bind(this) }>toggle asc des</button></div>
          <div>{ location }</div>
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    )
  }
}

export default Game;