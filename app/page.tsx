import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SudokuPuzzle from "./components/SudokuPuzzle";
import { solveSudoku } from "./helpers/matrix";

export default async function Home() {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.from("sudoku_puzzles").select();
  let selectedPuzzle: string = "";

  if (data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    selectedPuzzle = data[randomIndex].puzzle;
    const solvedPuzzle = solveSudoku(selectedPuzzle.split(""));

    return (
      <div className="w-full flex flex-col items-center">
        <SudokuPuzzle selectedPuzzle={selectedPuzzle} puzzleSolution={solvedPuzzle} />
        {/* <SudokuPuzzle
          selectedPuzzle={
            "..3456789456789123789123456214365897365897214897214365531642978642978531978531642"
          }
          puzzleSolution={
            "123456789456789123789123456214365897365897214897214365531642978642978531978531642".split('')
          }
        /> */}
      </div>
    );
  } else if (error) {
    return (
      <div className="w-full flex flex-col items-center">
        <h1>
          Error: {error.message} Please contact the administrator for help.
        </h1>
      </div>
    );
  }
}
