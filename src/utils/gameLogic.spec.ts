import { initializeBoard, placeChip } from "./gameLogic";

describe("gameLogic", () => {
	describe("initializeBoard", () => {
		test("initializes a 7x6 board with all null values", () => {
			const board = initializeBoard();
			expect(board).toHaveLength(7);
			board.forEach((column) => {
				expect(column).toHaveLength(6);
				column.forEach((cell) => expect(cell).toBeNull());
			});
		});
	});

	describe("placeChip", () => {
		test("places a chip in the correct position", () => {
			let board = initializeBoard();
			const columnIndex = 0;
			const player = "R";

			board = placeChip(board, columnIndex, player);
			expect(board[columnIndex][0]).toBe(player);
			for (let i = 1; i < 6; i++) {
				expect(board[columnIndex][i]).toBeNull();
			}
		});
	});
});
