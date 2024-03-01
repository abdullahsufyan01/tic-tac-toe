// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isPlayingWithComputer, setIsPlayingWithComputer] = useState(false);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (winner || board[index] || (isPlayingWithComputer && !xIsNext)) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    if (isPlayingWithComputer && !winner && !newBoard.includes(null)) {
      setTimeout(() => {
        computerMove();
      }, 500);
    }
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index]}`}
        onClick={() => handleClick(index)}
        disabled={winner || board[index] || (isPlayingWithComputer && !xIsNext)}
      >
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const togglePlayer = () => {
    setIsPlayingWithComputer(!isPlayingWithComputer);
    resetGame();
  };

  const computerMove = () => {
    const emptySquares = board.reduce((acc, val, index) => {
      if (!val) acc.push(index);
      return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    handleClick(emptySquares[randomIndex]);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((square) => square)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={isPlayingWithComputer}
            onChange={togglePlayer}
          />
          Play with Computer
        </label>
      </div>
      <div className="board">
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
      </div>
      <div className="status">{status}</div>
      <button className="reset-btn" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }
  return null;
};

export default App;
