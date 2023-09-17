import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const fetchPuzzle = async () => {
  const supabase = createClientComponentClient();

  const { data } = await supabase.from("sudoku_puzzles").select();

  if (data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex].puzzle.split("");
  } else {
    return null;
  }
};

export { fetchPuzzle };
