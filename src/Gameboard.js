import React, { useState } from "react";
import Square from "./square";

function GameBoard({ size, winLength }) {
  const [board, setBoard] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(""))
  );
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("X's turn");
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (row, col) => {
    if (board[row][col] || gameOver) return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (xIsNext ? "X" : "O") : cell
      )
    );

    setBoard(newBoard);
    const winner = checkWinner(newBoard, row, col, xIsNext ? "X" : "O");

    if (winner) {
      setStatus(`${winner} is the winner`);
      setGameOver(true);
    } else if (newBoard.flat().every((cell) => cell)) {
      setStatus("Draw!");
      setGameOver(true);
    } else {
      setXIsNext(!xIsNext);
      setStatus(`${!xIsNext ? "X" : "O"}'s turn`);
    }
  };

  const checkWinner = (board, row, col, player) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (let [dx, dy] of directions) {
      let count = 1;

      for (let dir = -1; dir <= 1; dir += 2) {
        let r = row + dir * dx;
        let c = col + dir * dy;

        while (
          r >= 0 &&
          c >= 0 &&
          r < size &&
          c < size &&
          board[r][c] === player
        ) {
          count++;
          r += dir * dx;
          c += dir * dy;
        }
      }

      if (count >= winLength) return player;
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-semibold mb-2">{status}</h2>
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${size}, 60px)`,
          gridTemplateRows: `repeat(${size}, 60px)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => handleClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default GameBoard;