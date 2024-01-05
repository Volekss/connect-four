import React from "react";
import { CellValue } from "../types";

interface CellProps {
	value: CellValue;
	columnIndex: number;
	rowIndex: number;
}

const Cell: React.FC<CellProps> = ({ value, columnIndex, rowIndex }) => {
	const getCellColor = (value: CellValue) => {
		switch (value) {
			case "R":
				return "red";
			case "Y":
				return "yellow";
			default:
				return "white";
		}
	};

	const cellStyle = {
		backgroundColor: getCellColor(value),
		width: "50px",
		height: "50px",
		border: "1px solid black",
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		margin: "5px",
	};

	return (
		<div
			aria-label="cell"
			style={cellStyle}
			data-testid={`cell-${columnIndex}-${rowIndex}`}
			data-value={value}
		/>
	);
};

export default Cell;
