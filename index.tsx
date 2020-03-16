import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import "./style.css";

type SquareType = string | null;

enum Player {
  None = "",
  X = "X",
  O = "O"
}

interface SquareProps {
  value: string;
  onClick: () => void;
}

interface BoardState {
  squares: SquareType[];
  xIsNext: boolean;
}

function Square(props: SquareProps) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares: SquareType[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  const result = lines
    .filter(([a, b, c]) => squares[a])
    .filter(([a, b, c]) => squares[a] === squares[b])
    .filter(([a, b, c]) => squares[a] === squares[c])
    .map(([a, b, c]) => squares[a]);
  return result.length === 0 ? null : result[0];
}

class Board extends React.Component<any, BoardState> {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  playerName() {
    return this.state.xIsNext ? "X" : "O";
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.playerName();
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = winner
      ? "Winner: " + winner
      : "Next player: " + this.playerName();

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
