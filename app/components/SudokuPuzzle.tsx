"use client";

import React, { useState, useRef } from "react";
import { FC } from "react";
import {
  calculateCellPosition,
} from "../helpers/matrix";

interface SudokuPuzzleProps {
  selectedPuzzle: string;
}

const SudokuPuzzle: FC<SudokuPuzzleProps> = (props) => {
  const [puzzle, setPuzzle] = useState<string[]>(
    props.selectedPuzzle.split("")
  );
  const initialPuzzle = useRef<string[]>(props.selectedPuzzle.split(""));

  const getCellValue = (boxIndex: number, cellIndex: number): string => {
    const [row, col] = calculateCellPosition(boxIndex, cellIndex);
    return puzzle[row * 9 + col];
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const flatIndex = row * 9 + col;
    setPuzzle((prevPuzzle) =>
      prevPuzzle.map((n, i) => (i === flatIndex ? value : n))
    );
  };

  const isEditable = (boxIndex: number, cellIndex: number): boolean => {
    const [row, col] = calculateCellPosition(boxIndex, cellIndex);
    return initialPuzzle.current[row * 9 + col] === ".";
  };

  return (
    <div className="sudoku-board p-2 w-6/12 max-w-xl">
      <div className="flex justify-between">
        <h1 className="text-2xl">Sudoku</h1>{" "}
        <div>
          <h2>Timer</h2>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] gap-2 ">
        {Array.from({ length: 9 }).map((_, boxIndex) => (
          <div
            className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] border-2"
            key={boxIndex}
          >
            {Array.from({ length: 9 }).map((_, cellIndex) => (
              <div
                className="p-2 border text-center font-bold"
                key={`cell-${cellIndex}`}
              >
                <input
                  className="w-full h-full text-center text-lg font-bold bg-sky-50"
                  type="number"
                  value={
                    getCellValue(boxIndex, cellIndex) === "."
                      ? ""
                      : getCellValue(boxIndex, cellIndex)
                  }
                  readOnly={!isEditable(boxIndex, cellIndex)}
                  onChange={(e) => {
                    const [row, col] = calculateCellPosition(
                      boxIndex,
                      cellIndex
                    );
                    handleInputChange(row, col, e.target.value);
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-8">
        <button className="btn">Load New Puzzle</button>
        <button className="btn">Check</button>
        <button className="btn">Solve For Me</button>
      </div>
    </div>
  );
};

export default SudokuPuzzle;
