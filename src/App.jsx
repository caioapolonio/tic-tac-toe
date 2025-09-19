import { useState } from "react";
import { FaRedo } from "react-icons/fa";
import Footer from "./components/Footer";

const EMPTY_BOARD = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = (squares) => {
    for (let [a, b, c] of winningCombinations) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { player: squares[a], combo: [a, b, c] };
      }
    }
    return null;
  };

  const winnerInfo = getWinner(board);
  const winner = winnerInfo?.player || null;
  const winningSquares = winnerInfo?.combo || [];
  const isDraw = !winner && board.every((square) => square !== null);

  const status = winner
    ? `🏆 Winner: ${winner}!`
    : isDraw
    ? "🤝 It's a draw!"
    : `🎮 Current player: ${isXTurn ? "❌" : "⭕"}`;

  const handleSquareClick = (index) => {
    if (board[index] || winner) return;
    const updatedBoard = [...board];
    updatedBoard[index] = isXTurn ? "X" : "O";
    setBoard(updatedBoard);
    setIsXTurn(!isXTurn);
  };

  const resetBoard = () => {
    setBoard(EMPTY_BOARD);
    setIsXTurn(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900">
      <div className="w-full max-w-96">
        <h1 className=" text-5xl font-extrabold mb-8 text-center text-white ">
          Tic Tac Toe
        </h1>

        <div
          className={`text-center mb-8 transition-all duration-500 ${
            winner || isDraw
              ? "text-4xl font-extrabold text-white drop-shadow-lg"
              : "text-gray-300 text-2xl font-bold"
          }`}
        >
          {status}
        </div>

        <div
          className="grid grid-cols-3 gap-3 mb-8 p-4 rounded-3xl shadow-2xl 
  bg-white/5 backdrop-blur-md border border-white/20"
        >
          {board.map((square, index) => {
            const isWinningSquare = winningSquares.includes(index);

            return (
              <button
                key={index}
                disabled={Boolean(winner || isDraw)}
                className={`h-28 w-full rounded-2xl text-6xl font-bold  disabled:cursor-not-allowed 
          ${square ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}
          ${
            square === "X"
              ? "text-white"
              : square === "O"
              ? "text-neutral-800"
              : ""
          }
          ${
            isWinningSquare
              ? winner === "X"
                ? "ring-3 ring-white shadow-lg"
                : "ring-3 ring-neutral-800 shadow-lg"
              : ""
          }
        `}
                onClick={() => handleSquareClick(index)}
              >
                {square}
              </button>
            );
          })}
        </div>

        <button
          onClick={resetBoard}
          className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-2xl 
             bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 
             text-center font-semibold text-white transition-all duration-300 
             hover:scale-105 hover:bg-white/20 hover:shadow-lg sm:flex-1"
        >
          <FaRedo /> New Game
        </button>

        <Footer />
      </div>
    </div>
  );
};

export default App;
