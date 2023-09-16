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

function splitArray(arr: string[], length: number) {
  let result = [];
  for (let i = 0; i < arr.length; i += length) {
    result.push(arr.slice(i, i + length));
  }
  return result;
}

function coordinateToIndex(coordinate: [number, number], rowLength: number) {
  const [row, col] = coordinate;
  if (row < 0 || col < 0 || row >= rowLength || col >= rowLength) {
    // Handle invalid coordinates (out of bounds)
    return -1;
  }
  return row * rowLength + col;
}

export { splitArray, coordinateToIndex, calculateCellPosition };
