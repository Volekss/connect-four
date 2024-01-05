import React, { useState } from "react";
import Board from "./components/Board";
import { Player, BoardState } from "./types";
import { initializeBoard, checkForWin, placeChip } from "./utils/gameLogic";
import "./styles/App.css";

const Game: React.FC = () => {
	const [board, setBoard] = useState<BoardState>(initializeBoard());
	const [currentPlayer, setCurrentPlayer] = useState<Player>("R");
	const [winner, setWinner] = useState<Player | null>(null);

	const handleColumnClick = (columnIndex: number) => {
		if (winner) {
			return;
		}

		const column = board[columnIndex];
		if (column[column.length - 1] !== null) {
			return;
		}

		const newBoard = placeChip(board, columnIndex, currentPlayer);
		setBoard(newBoard);

		const gameWinner = checkForWin(newBoard);
		if (gameWinner) {
			setWinner(gameWinner);
			return;
		}

		setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
	};

	const resetGame = () => {
		setBoard(initializeBoard());
		setCurrentPlayer("R");
		setWinner(null);
	};

	return (
		<div>
			<h1>Connect Four</h1>
			{winner ? <p>{winner} wins!</p> : <p>Current Player: {currentPlayer}</p>}
			<Board board={board} onColumnClick={handleColumnClick} />
			<button onClick={resetGame}>Reset Game</button>
		</div>
	);
};

export default Game;
