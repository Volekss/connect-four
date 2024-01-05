import { BoardState, Player, CellValue } from "../types";

export const initializeBoard = (): BoardState => {
	const numberOfRows = 6;
	const numberOfColumns = 7;
	return Array(numberOfColumns)
		.fill(null)
		.map(() => Array(numberOfRows).fill(null));
};

export const placeChip = (
	board: BoardState,
	columnIndex: number,
	player: Player
): BoardState => {
	const newBoard = board.map((column) => [...column]);

	for (let rowIndex = 0; rowIndex < newBoard[columnIndex].length; rowIndex++) {
		if (newBoard[columnIndex][rowIndex] === null) {
			newBoard[columnIndex][rowIndex] = player;
			break;
		}
	}

	return newBoard;
};

export const checkForWin = (board: BoardState): Player | null => {
	const winningConditions = [checkHorizontal, checkVertical, checkDiagonal];
	for (const condition of winningConditions) {
		const winner = condition(board);
		if (winner) return winner;
	}
	return null;
};

const checkHorizontal = (board: BoardState): Player | null => {
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 4; col++) {
			if (
				checkLine(
					board[col][row],
					board[col + 1][row],
					board[col + 2][row],
					board[col + 3][row]
				)
			) {
				return board[col][row];
			}
		}
	}
	return null;
};

const checkVertical = (board: BoardState): Player | null => {
	for (let col = 0; col < 7; col++) {
		for (let row = 0; row < 3; row++) {
			if (
				checkLine(
					board[col][row],
					board[col][row + 1],
					board[col][row + 2],
					board[col][row + 3]
				)
			) {
				return board[col][row];
			}
		}
	}
	return null;
};

const checkDiagonal = (board: BoardState): Player | null => {
	for (let col = 0; col < 4; col++) {
		for (let row = 0; row < 3; row++) {
			if (
				checkLine(
					board[col][row],
					board[col + 1][row + 1],
					board[col + 2][row + 2],
					board[col + 3][row + 3]
				)
			) {
				return board[col][row];
			}
		}
	}
	for (let col = 0; col < 4; col++) {
		for (let row = 3; row < 6; row++) {
			if (
				checkLine(
					board[col][row],
					board[col + 1][row - 1],
					board[col + 2][row - 2],
					board[col + 3][row - 3]
				)
			) {
				return board[col][row];
			}
		}
	}
	return null;
};

const checkLine = (
	a: CellValue,
	b: CellValue,
	c: CellValue,
	d: CellValue
): boolean => {
	return a !== null && a === b && a === c && a === d;
};
