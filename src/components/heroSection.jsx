import { useEffect, useContext } from "react";
import { SortContext } from "../contextAPI/context";

const HeroSection = () => {
  const {
    array,
    activeIndices,
    resetArray,
    handleSliderChange,
    value,
    timeTaken,
  } = useContext(SortContext);

  useEffect(() => {
    resetArray();
  }, []);

  return (
    <div className="py-6 px-4  md:px-8 space-y-8 backdrop-blur-md bg-white/10 dark:bg-white/5 rounded-2xl border border-white/10 shadow-lg  mx-2 sm:mx-4 transition-all duration-300">
      
      {/* Controls Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
        {/* Slider */}
        <div className="w-full md:w-2/3 flex flex-col sm:flex-row items-center gap-4">
          <input
            type="range"
            min="10"
            max="200"
            value={value}
            onChange={handleSliderChange}
            className="w-full h-2 appearance-none cursor-pointer accent-[#00FFC6] dark:bg-zinc-700 rounded-lg transition bg-zinc-900"
          />
          <span className="text-xl font-semibold text-white min-w-[50px] text-center">
            {value}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={resetArray}
          className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 bg-zinc-900 text-white hover:opacity-90 shadow-md hover:shadow-lg shadow-cyan-400/20"
        >
          Generate New Array
        </button>
      </div>

      {/* Visualization Area */}
      <div className="p-8 sm:p-8 bg-[#0f0f0f]/40 dark:bg-black/30 rounded-2xl border border-white/10 overflow-x-auto">
        <div
          className="grid gap-[1px] sm:gap-1 h-[250px] sm:h-[350px] md:h-[400px] items-end"
          style={{
            minWidth: `${array.length * (array.length > 180 ? 2 : 6)}px`,
            gridTemplateColumns: `repeat(${array.length}, minmax(2px, 1fr))`,
          }}
        >
          {array.map((value, index) => (
            <div key={index} className="flex justify-center items-end">
              <div
                className={`w-full transition-all duration-75 ease-linear rounded-2xl shadow-md ${
                  activeIndices.includes(index)
                    ? "bg-[#e86f18] shadow-[#FF6B6B]/50"
                    : "bg-[#3fa3dc] shadow-[#0057FF]/30"
                }`}
                style={{
                  height: `${value * 2.5}px`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Time Display */}
      <div className="text-center">
        <div className="inline-block px-4 sm:px-6 py-3 bg-[#1f1f1f]/70 rounded-xl border border-white/10">
          <h1 className="text-base sm:text-xl font-bold text-white">
            Sorting Time:{" "}
            <span className="text-[#FFD600] font-bold">{timeTaken}</span> ms
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
