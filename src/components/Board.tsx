import React, { CSSProperties } from "react";
import Cell from "./Cell";
import { BoardState } from "../types";

interface BoardProps {
	board: BoardState;
	onColumnClick: (columnIndex: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onColumnClick }) => {
	return (
		<div style={boardStyle}>
			{board.map((column, columnIndex) => (
				<div
					key={columnIndex}
					style={columnStyle}
					onClick={() => onColumnClick(columnIndex)}
					data-testid={`column-${columnIndex}`}
				>
					{column.map((cell, rowIndex) => (
						<Cell
							key={`${columnIndex}-${rowIndex}`}
							value={cell}
							columnIndex={columnIndex}
							rowIndex={rowIndex}
						/>
					))}
				</div>
			))}
		</div>
	);
};

const boardStyle: CSSProperties = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: "20px auto",
};

const columnStyle: CSSProperties = {
	display: "flex",
	flexDirection: "column-reverse",
	marginRight: "5px",
	cursor: "pointer",
};

export default Board;
