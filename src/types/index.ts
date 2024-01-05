export type Player = "R" | "Y";

export type CellValue = Player | null;

export type Column = CellValue[];

export type BoardState = Column[];
