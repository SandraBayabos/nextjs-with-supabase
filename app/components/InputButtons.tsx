interface InputButtonsProps {
  puzzle: Array<string>;
  setPuzzle: React.Dispatch<React.SetStateAction<string[]>>;
  activeIndex?: number;
}

const InputButtons: React.FC<InputButtonsProps> = ({
  puzzle,
  setPuzzle,
  activeIndex,
}) => {
  const buttonStyle =
    "bg-white color-black rounded h-full w-full aspect-square text-red-300 font-bold bg-transparent border-2 border-red-300 hover:bg-red-300 hover:text-white transition-all duration-300";
  return (
    <div className="flex flex-col gap-2">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
        <button
          onClick={() => {
            setPuzzle(puzzle.map((n, i) => (i === activeIndex ? num : n)));
          }}
          key={num}
          className={buttonStyle}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default InputButtons;
