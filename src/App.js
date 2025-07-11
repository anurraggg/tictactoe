import React, { useState } from "react";
import "./App.css";

function App() {
  const [boardSize, setBoardSize] = useState(3);
  const [winLength, setWinLength] = useState(3);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("Setup");
  const [error, setError] = useState("");

  const initializeBoard = () => {
    if (winLength > boardSize) {
      setError("Invalid Input");
      return;
    }
    setError("");
    setGameStatus("Playing");
    setBoard(Array(boardSize * boardSize).fill(null));
    setCurrentPlayer("X");
  };

  const resetGame = () => {
    setBoard([]);
    setGameStatus("Setup");
  };

  const checkWinner = (updatedBoard) => {
    const directions = [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ];

    const getCell = (row, col) => {
      if (row < 0 || row >= boardSize || col < 0 || col >= boardSize)
        return null;
      return updatedBoard[row * boardSize + col];
    };

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const current = getCell(row, col);
        if (!current) continue;

        for (let [dx, dy] of directions) {
          let count = 1;
          for (let step = 1; step < winLength; step++) {
            if (getCell(row + step * dy, col + step * dx) === current) {
              count++;
            } else {
              break;
            }
          }
          if (count === winLength) return current;
        }
      }
    }

    return updatedBoard.includes(null) ? null : "Draw";
  };

  const handleClick = (index) => {
    if (board[index] || gameStatus !== "Playing") return;

    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;
    setBoard(updatedBoard);

    const result = checkWinner(updatedBoard);
    if (result) {
      setGameStatus(result === "Draw" ? "Draw" : `${result} wins`);
    } else {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>

      {gameStatus === "Setup" && (
        <div className="setup">
          <label>
            Game Size:
            <input
              type="number"
              value={boardSize}
              onChange={(e) => setBoardSize(Number(e.target.value))}
              min={1}
            />
          </label>
          <label>
            Win Condition:
            <input
              type="number"
              value={winLength}
              onChange={(e) => setWinLength(Number(e.target.value))}
              min={1}
            />
          </label>
          <button onClick={initializeBoard}>Start</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {gameStatus !== "Setup" && (
        <>
          <h2>
            {gameStatus === "Playing" ? `${currentPlayer}'s turn` : gameStatus}
          </h2>
          <div
            className="board"
            style={{
              gridTemplateColumns: `repeat(${boardSize}, 60px)`,
              gridTemplateRows: `repeat(${boardSize}, 60px)`,
            }}
          >
            {board.map((cell, idx) => (
              <button
                key={idx}
                className="cell"
                onClick={() => handleClick(idx)}
              >
                {cell}
              </button>
            ))}
          </div>
          <button className="reset-btn" onClick={resetGame}>
            Reset
          </button>
        </>
      )}
    </div>
  );
}

export default App;
