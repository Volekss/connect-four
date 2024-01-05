import { render, screen, fireEvent } from "@testing-library/react";
import Game from "./Game";
import "@testing-library/jest-dom";

describe("Game Component", () => {
	test("initializes the game board correctly", () => {
		render(<Game />);
		const cells = screen.getAllByTestId(/^cell-\d+-\d+$/);
		expect(cells).toHaveLength(42); // 7 columns x 6 rows
	});

	test("handles column clicks and updates the game state", () => {
		render(<Game />);
		const firstColumnCells = screen.getAllByTestId(/^cell-0-\d+$/);
		fireEvent.click(firstColumnCells[0]);

		expect(firstColumnCells[0]).toHaveAttribute("data-value", "R");
	});

	test("resets the game when the reset button is clicked", () => {
		render(<Game />);
		const firstColumnCells = screen.getAllByTestId(/^cell-0-\d+$/);
		fireEvent.click(firstColumnCells[0]);

		const resetButton = screen.getByText("Reset Game");
		fireEvent.click(resetButton);

		const cellsAfterReset = screen.getAllByTestId(/^cell-\d+-\d+$/);
		cellsAfterReset.forEach((cell) => {
			expect(cell).toHaveTextContent("");
		});
	});
});
