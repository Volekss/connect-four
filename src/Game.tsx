import React, { useState, useEffect, useCallback } from "react";
import Board from "./components/Board";
import { Player, BoardState } from "./types";
import { initializeBoard, checkForWin, placeChip } from "./utils/gameLogic";
import JSConfetti from "js-confetti";
import "./styles/App.css";

const Game: React.FC = () => {
	const [board, setBoard] = useState<BoardState>(initializeBoard());
	const [currentPlayer, setCurrentPlayer] = useState<Player>("R");
	const [winner, setWinner] = useState<Player | null>(null);
	const [isPlayingWithAI, setIsPlayingWithAI] = useState<boolean>(false);

	const checkForWinner = useCallback((board: BoardState, player: Player) => {
		const jsConfetti = new JSConfetti();
		const gameWinner = checkForWin(board);
		if (gameWinner === player) {
			setWinner(gameWinner);
			jsConfetti.addConfetti();
		} else {
			setCurrentPlayer(player === "R" ? "Y" : "R");
		}
	}, []);

	const handleAITurn = useCallback(() => {
		const availableColumns = [];
		for (let i = 0; i < board.length; i++) {
			if (board[i][board[i].length - 1] === null) {
				availableColumns.push(i);
			}
		}

		if (availableColumns.length > 0) {
			const randomColumnIndex =
				availableColumns[Math.floor(Math.random() * availableColumns.length)];
			const newBoard = placeChip(board, randomColumnIndex, "Y");
			setBoard(newBoard);
			checkForWinner(newBoard, "Y");
		}
	}, [board, checkForWinner]);

	useEffect(() => {
		if (isPlayingWithAI && currentPlayer === "Y" && !winner) {
			setTimeout(() => handleAITurn(), 500);
		}
	}, [currentPlayer, handleAITurn, isPlayingWithAI, winner]);

	const handleColumnClick = (columnIndex: number) => {
		if (winner || (isPlayingWithAI && currentPlayer === "Y")) return;

		const column = board[columnIndex];
		if (column[column.length - 1] !== null) return;

		const newBoard = placeChip(board, columnIndex, currentPlayer);
		setBoard(newBoard);
		checkForWinner(newBoard, currentPlayer);
	};

	const resetGame = () => {
		setBoard(initializeBoard());
		setCurrentPlayer("R");
		setWinner(null);
	};

	const togglePlayer = () => {
		resetGame();
		setIsPlayingWithAI(!isPlayingWithAI);
	};

	return (
		<div>
			<h1>Connect Four</h1>
			{winner ? <b>{winner} wins!</b> : <p>Current Player: {currentPlayer}</p>}
			{isPlayingWithAI ? (
				<p>Playing against AI</p>
			) : (
				<p>Playing against Human</p>
			)}
			<Board board={board} onColumnClick={handleColumnClick} />
			<div>
				<button onClick={resetGame}>Reset Game</button>
			</div>
			<div style={{ marginTop: 10 }}>
				<button onClick={togglePlayer}>
					{isPlayingWithAI ? "Play against Human" : "Play against AI"}
				</button>
			</div>
		</div>
	);
};

export default Game;
