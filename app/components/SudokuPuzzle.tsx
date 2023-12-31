"use client";

import { FC, useCallback, useState } from "react";
import { fetchPuzzle } from "../helpers/fetchPuzzle";
import { checkSudoku, getFlattenIndex, solveSudoku } from "../helpers/matrix";
import Button from "./Button";
import Confetti from "./Confetti";
import InputButtons from "./InputButtons";

enum GAME_STATE {
  PLAYING,
  WON,
  LOST,
}

interface SudokuPuzzleProps {
  selectedPuzzle: Array<string>;
}

const cellStyle =
  "aspect-square border border-sky-200 w-full h-full text-center text-lg font-bold outline-none transition-all duration-300";

const SudokuPuzzle: FC<SudokuPuzzleProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [initialPuzzle, setInitialPuzzle] = useState(props.selectedPuzzle);
  const [puzzle, setPuzzle] = useState(props.selectedPuzzle);
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);

  const isFilled = puzzle.every((cell) => cell !== ".");

  const fetchNewPuzzle = async () => {
    setGameState(GAME_STATE.PLAYING);
    setLoading(true);
    const selectedPuzzle = await fetchPuzzle();
    setInitialPuzzle(selectedPuzzle);
    setPuzzle(selectedPuzzle);
    setLoading(false);
  };

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
    const result = checkSudoku(initialPuzzle, puzzle);
    if (result) {
      setGameState(GAME_STATE.WON);
    } else {
      setGameState(GAME_STATE.LOST);
    }
  }

  const solveForMe = useCallback(async () => {
    setPuzzle(solveSudoku(initialPuzzle));
  }, [initialPuzzle]);

  const GameStateDisplay = () => {
    const giveUp = () => {
      fetchNewPuzzle();
      setGameState(GAME_STATE.PLAYING);
    };
    const continuePuzzle = () => {
      setGameState(GAME_STATE.PLAYING);
    };

    const gameStateSwitch = {
      [GAME_STATE.PLAYING]: (
        <div className="text-4xl font-black text-red-400 tracking-wider">
          SUDOKU
        </div>
      ),
      [GAME_STATE.WON]: (
        <>
          <Confetti />
          <div className="text-4xl font-black text-green-400 tracking-wide">
            You solved it!
          </div>
        </>
      ),
      [GAME_STATE.LOST]: (
        <>
          <div className="text-center fixed inset-0 bg-slate-700/80 gap-4 flex flex-col items-center justify-center flex-between">
            <div className="text-4xl font-black text-red-400 tracking-wide">
              Oops! That's not right...
            </div>
            <Button className="py-2 px-3 mx-5 w-32" onClick={continuePuzzle}>
              Continue
            </Button>
            <Button className="py-2 px-3 mx-3 w-32" onClick={giveUp}>
              I Give Up
            </Button>
          </div>
        </>
      ),
    };
    return (
      <>
        <div className="flex flex-col justify-center">
          {gameStateSwitch[gameState]}
        </div>
      </>
    );
  };

  return (
    <>
      <GameStateDisplay />
      <div className="sudoku-board p-2 w-11/12 w-md-6/12 max-w-xl">
        <div className="grid grid-cols-[1fr_35px] items-center gap-4">
          <div>
            <div className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr]">
              {Array.from({ length: 9 }).map((_, boxIndex) => (
                <div
                  className="grid grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1fr_1fr] border-2 border-sky-200"
                  key={boxIndex}
                >
                  {Array.from({ length: 9 }).map((_, cellIndex) => {
                    if (loading)
                      return (
                        <input
                          disabled
                          value=""
                          key={`${boxIndex}-${cellIndex}`}
                          className={`cursor-wait ${cellStyle}`}
                        />
                      );

                    const cellValue = getCellValue(boxIndex, cellIndex);
                    const isEditable =
                      initialPuzzle[getFlattenIndex(boxIndex, cellIndex)] ===
                      ".";

                    return (
                      <input
                        key={`${boxIndex}-${cellIndex}`}
                        className={`cursor-pointer focus:border-white focus:border-4 focus:border-sky-50 ${cellStyle} ${
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
        <div className="flex justify-between pt-8 gap-2">
          <Button
            className="w-full"
            onClick={fetchNewPuzzle}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load New Puzzle"}
          </Button>
          <Button
            className="w-full"
            onClick={validatePuzzle}
            disabled={!isFilled}
          >
            Check
          </Button>
          <Button className="w-full" onClick={solveForMe} disabled={loading}>
            Solve For Me
          </Button>
        </div>
      </div>
    </>
  );
};

export default SudokuPuzzle;
