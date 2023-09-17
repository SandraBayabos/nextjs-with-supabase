import SudokuPuzzle from "./components/SudokuPuzzle";
import { fetchPuzzle } from "./helpers/fetchPuzzle";

// Do not cache supabase data response
export const revalidate = 0;

export default async function Home() {
  const selectedPuzzle = await fetchPuzzle();

  if (!selectedPuzzle) {
    return (
      <div className="w-full flex flex-col items-center relative">
        <h1>
          Unable to fetch puzzle. Please try again later or contact support.
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <SudokuPuzzle selectedPuzzle={selectedPuzzle} />
    </div>
  );
}
