"use client";

import { FC, useRef, useState } from "react";
import { checkSudoku, getFlattenIndex } from "../helpers/matrix";
import InputButtons from "./InputButtons";
import Confetti from "./Confetti";

enum GAME_STATE {
  PLAYING,
  WON,
  LOST,
}

interface SudokuPuzzleProps {
  selectedPuzzle: string;
  puzzleSolution: string[];
}

const SudokuPuzzle: FC<SudokuPuzzleProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const [puzzle, setPuzzle] = useState<string[]>(
    props.selectedPuzzle.split("")
  );

  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);

  const initialPuzzle = useRef<string[]>(props.selectedPuzzle.split(""));
  
  const isFilled = puzzle.every((cell) => cell !== ".");

  const getCellValue = (boxIndex: number, cellIndex: number): string => {
    const idx = getFlattenIndex(boxIndex, cellIndex);
    return puzzle[idx];
  };

  const handleInputChange = (row: number, col: number, value: string) => {
    const flatIndex = getFlattenIndex(row, col);

    if (value === "" || (value.length === 1 && value >= "1" && value <= "9")) {
      setPuzzle((prevPuzzle) =>
        prevPuzzle.map((n, i) => (i === flatIndex ? value : n))
      );
    }
  };

  function validatePuzzle() {
    const result = checkSudoku(initialPuzzle.current, puzzle);
    if (result) {
      setGameState(GAME_STATE.WON);
    } else {
      setGameState(GAME_STATE.LOST);
    }
  }

  const GameStateDisplay = () => {
    const loadNewPuzzle = () => {
      window.location.reload();
      // setGameState(GAME_STATE.PLAYING);
    };
    const continuePuzzle = () => {
      setGameState(GAME_STATE.PLAYING);
    };

    const gameStateSwitch = {
      [GAME_STATE.PLAYING]: (
        <div className="text-4xl font-black text-red-400 tracking-wide">
          SUDOKU
        </div>
      ),
      [GAME_STATE.WON]: (
        <>
          <Confetti />
          <div className="text-4xl font-black text-red-400 tracking-wide">
            YOU WON!
          </div>
        </>
      ),
      [GAME_STATE.LOST]: (
        <>
          <div className="text-4xl font-black text-red-400 tracking-wide">
            YOU LOST!
          </div>
          <button onClick={continuePuzzle}>Continue</button>
          <button onClick={loadNewPuzzle}>I Give Up..</button>
        </>
      ),
    };
    return (
      <>
        <div className="flex flex-col">{gameStateSwitch[gameState]}</div>
      </>
    );
  };


  const solveForMe = () => {
    setPuzzle(props.puzzleSolution);
  };

  return (
    <>
      <GameStateDisplay />
      <div className="sudoku-board p-2 w-6/12 max-w-xl">
        <div className="grid grid-cols-[1fr_35px] items-center gap-4">
          <div>
            <div className="flex justify-between">
              <div>
                <h2>Timer</h2>
              </div>
            </div>
            <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
              {Array.from({ length: 9 }).map((_, boxIndex) => (
                <div
                  className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] border-2 border-sky-200"
                  key={boxIndex}
                >
                  {Array.from({ length: 9 }).map((_, cellIndex) => {
                    const cellValue = getCellValue(boxIndex, cellIndex);
                    const isEditable =
                      initialPuzzle.current[
                        getFlattenIndex(boxIndex, cellIndex)
                      ] === ".";

                    return (
                      <input
                        key={`${boxIndex}-${cellIndex}`}
                        className={`cursor-pointer aspect-square border border-sky-200 w-full h-full text-center text-lg font-bold outline-none focus:border-white focus:border-4 focus:border-sky-50 transition-all duration-300 ${
                          isEditable
                            ? "bg-red-100 hover:bg-red-50"
                            : "bg-transparent"
                        }`}
                        type="number"
                        min="1"
                        max="9"
                        onFocus={() =>
                          setActiveIndex(
                            isEditable
                              ? getFlattenIndex(boxIndex, cellIndex)
                              : undefined
                          )
                        }
                        value={cellValue === "." ? "" : cellValue}
                        readOnly={!isEditable}
                        onChange={(e) => {
                          handleInputChange(
                            boxIndex,
                            cellIndex,
                            e.target.value
                          );
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <InputButtons
            activeIndex={activeIndex}
            puzzle={puzzle}
            setPuzzle={setPuzzle}
          />
        </div>
        <div className="flex justify-between pt-8">
          <button className="btn text-slate-100 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-md py-2 px-3">
            Load New Puzzle
          </button>
          <button
            className={`btn text-slate-100 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-md py-2 px-3 ${
              isFilled ? "" : "opacity-50 cursor-not-allowed"
            }`}
            onClick={validatePuzzle}
          >
            Check
          </button>
          <button
            className="btn text-slate-100 bg-gradient-to-tr from-sky-300 to-sky-500 rounded-md py-2 px-3"
            onClick={solveForMe}
          >
            Solve For Me
          </button>
        </div>
      </div>
    </>
  );
};

export default SudokuPuzzle;
