# Sudoku Game Web Application with NextJS, TailwindCSS and Supabase (& Jest for testing)

A dynamic web application for Sudoku, built using Next.js. The application fetches random Sudoku puzzles from a Supabase database and provides features for users to solve, validate, and get solutions.
[View & Play Live Game Here](https://nextjs-with-supabase-liard-seven.vercel.app/)

<img src="/screenshots/sudokuweb.png" alt="Sudoku Board" width="400"/>
<img src="/screenshots/sudokumobile.png" alt="Sudoku Board" width="400"/>

## Features

1. Random Puzzle Selection: Fetches an array of saved Sudoku puzzles from Supabase and randomises the puzzle on load
2. Interactive Sudoku Game Board: Allows users to input numbers either by typing, or selecting a cell and then inserting a number by clicking on the list of numbers from 1-9, to solve the puzzle.
3. Validation: Validates the user's solution and provides a win/lose outcome.
4. Auto-Solve: "Solve For Me" feature to automatically fill in the correct solution.
5. Responsive Design: Adapted to mobile

## Getting Started

- Ensure Node.js & npm are installed [mine are v18.14.2 & 9.5.0 respectively]
- Clone repository
- `npm install`
- Rename `.env.local.example` to `.env.local` and update the values for `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
- Run `npm run dev` to start the local development server

## Future Enhancements
- Adding a timer onload so users can gauge their time to complete a puzzle
- Adding in more tests for SudokuPuzzle.tsx and solver logic
- Implement difficulty level rating by number of cells to fill in