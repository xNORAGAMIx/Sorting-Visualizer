/* eslint-disable react/prop-types */
import { useContext } from "react";
import { SortContext } from "../contextAPI/context";

const Header = () => {
  const {
    handleBubbleSort,
    isSorting,
    handleSelectionSort,
    handleInsertionSort,
    handleMergeSort,
  } = useContext(SortContext);

  return (
    <div className="flex flex-col gap-4 md:flex-row justify-between items-center p-4 md:p-4 mx-2 sm:mx-2 mt-2 rounded-2xl
      backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 
      shadow-lg transition-all duration-300">
      
      {/* Logo Section */}
      <div className="flex items-center justify-center w-full md:w-auto text-white">       
        <span className="text-3xl sm:text-4xl font-bold text-white">Sorting</span>
        <span className="text-3xl sm:text-4xl font-bold text-[#ec7d22]">Visualizer</span>
      </div>

      {/* Sorting Buttons */}
      <div className="flex flex-wrap justify-center gap-3 w-full md:w-auto">
        <SortButton
          onClick={handleBubbleSort}
          disabled={isSorting}
          label="Bubble Sort"
          color="bg-zinc-900"
        />
        <SortButton
          onClick={handleSelectionSort}
          disabled={isSorting}
          label="Selection Sort"
          color="bg-zinc-900"
        />
        <SortButton
          onClick={handleInsertionSort}
          disabled={isSorting}
          label="Insertion Sort"
          color="bg-zinc-900"
        />
        <SortButton
          onClick={handleMergeSort}
          disabled={isSorting}
          label="Merge Sort"
          color="bg-zinc-900"
        />
      </div>
    </div>
  );
};

const SortButton = ({ onClick, disabled, label, color }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300
        ${
          disabled
            ? "bg-gray-500/30 text-gray-300 cursor-not-allowed"
            : `${color} text-white hover:opacity-90 shadow-md hover:shadow-lg shadow-cyan-400/20`
        }`}
    >
      {label}
    </button>
  );
};

export default Header;
