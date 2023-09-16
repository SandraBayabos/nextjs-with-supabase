import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SudokuPuzzle from "./components/SudokuPuzzle";

interface puzzleData {
  id: number;
  puzzle: string[][];
  created_at: string;
}

export default async function Home() {
  const supabase = createClientComponentClient();

  const { data, error } = await supabase.from("sudoku_puzzles").select();
  let selectedPuzzle: string = "";

  if (data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    selectedPuzzle = data[randomIndex].puzzle;

    return (
      <div className="w-full flex flex-col items-center">
        <SudokuPuzzle selectedPuzzle={selectedPuzzle} />
      </div>
    );
  } else if (error) {
    return (
      <div className="w-full flex flex-col items-center">
        <h1>Error: {error.message} Please contact the administrator for help.</h1>
      </div>
    );
  }
}
