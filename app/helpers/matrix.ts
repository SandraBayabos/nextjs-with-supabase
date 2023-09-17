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

// Convert 1D array to 2D array with 9 elements in each row
function createMatrix(arr: number[]): number[][] {
  const matrix: number[][] = [];
  for (let i = 0; i < arr.length; i += 9) {
    matrix.push(arr.slice(i, i + 9));
  }
  return matrix;
}

// Replace all "." cells with null
function parseEmptyCells(input: string[]) {
  return input.map((cell) => (cell === "." ? null : parseInt(cell, 10)));
}

// Validate whether a number can be inserted into a specific cell
function isValid(
  board: (number | null)[],
  row: number,
  col: number,
  num: number
) {
  for (let x = 0; x < 9; x++) {
    const i = Math.floor(row / 3) * 3 + Math.floor(x / 3);
    const j = Math.floor(col / 3) * 3 + (x % 3);
    if (
      board[row * 9 + x] === num ||
      board[x * 9 + col] === num ||
      board[i * 9 + j] === num
    ) {
      return false;
    }
  }
  return true;
}

// Sudoku solver
function solveSudoku(input: string[]): (number | null)[] {
  // Convert all "." cells to null
  const board = parseEmptyCells(input);

  function backtrack(cell = 0) {
    if (cell === 81) return true;
    if (board[cell] !== null) return backtrack(cell + 1); // Skip filled cells

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, Math.floor(cell / 9), cell % 9, num)) {
        board[cell] = num;
        if (backtrack(cell + 1)) return true; // Move to the next cell
        board[cell] = null; // Reset the current cell (backtrack)
      }
    }
    return false; // No valid numbers can be placed in this cell
  }

  backtrack();
  return board;
}

export { calculateCellPosition, createMatrix, parseEmptyCells, solveSudoku };
