// Input: [0,3]
// Output: [1,0]
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

// Input: [1,0]
// Output: 9
const getFlattenIndex = (boxIndex: number, cellIndex: number): number => {
  const [row, col] = calculateCellPosition(boxIndex, cellIndex);
  return row * 9 + col;
};

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
function solveSudoku(input: string[]): string[] {
  const board = parseEmptyCells(input);

  function backtrack(cell = 0) {
    if (cell === 81) return true;
    if (board[cell] !== null) return backtrack(cell + 1);
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, Math.floor(cell / 9), cell % 9, num)) {
        board[cell] = num;
        if (backtrack(cell + 1)) return true;
        board[cell] = null;
      }
    }
    return false;
  }

  backtrack();
  return board.map((cell) => (cell === null ? "." : cell.toString()));
}

function checkSudoku(question: string[], attempt: string[]): boolean {
  function isValid(
    board: string[],
    row: number,
    col: number,
    num: string
  ): boolean {
    for (let x = 0; x < 9; x++) {
      const i = Math.floor(row / 3) * 3 + Math.floor(x / 3);
      const j = Math.floor(col / 3) * 3 + (x % 3);
      if (
        (board[row * 9 + x] === num && x !== col) ||
        (board[x * 9 + col] === num && x !== row) ||
        (board[i * 9 + j] === num && i !== row && j !== col)
      ) {
        return false;
      }
    }
    return true;
  }

  for (let i = 0; i < 81; i++) {
    if (question[i] !== "." && question[i] !== attempt[i]) {
      return false;
    }

    if (
      question[i] === "." &&
      !isValid(attempt, Math.floor(i / 9), i % 9, attempt[i])
    ) {
      return false;
    }
  }
  return true;
}

export {
  calculateCellPosition,
  getFlattenIndex,
  parseEmptyCells,
  solveSudoku,
  checkSudoku,
};
