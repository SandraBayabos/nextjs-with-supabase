function calculateCellPosition(
  boxIndex: number,
  cellIndex: number
): [number, number] {
  const boxRow = Math.floor(boxIndex / 3);
  const boxCol = boxIndex % 3;

  const cellRow = Math.floor(cellIndex / 3);
  const cellCol = cellIndex % 3;

  const row = boxRow * 3 + cellRow;
  const col = boxCol * 3 + cellCol;

  return [row, col];
}

export { calculateCellPosition };
