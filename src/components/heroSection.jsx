import { useEffect, useContext } from "react";
import { SortContext } from "../contextAPI/context";

const HeroSection = () => {
    const { array, activeIndices, resetArray, handleSliderChange, value, timeTaken } = useContext(SortContext);

    useEffect(() => {
        resetArray();
    }, []);

    return (
        <div className="py-4 px-12 space-y-6">
            <div className="flex items-center">
                <input
                    type="range"
                    min="10"
                    max="200"
                    value={value}
                    onChange={handleSliderChange}
                    className="w-full"
                />
                <span className="ml-4 text-lg text-white font-semibold">{value}</span> 
            </div>
            <div className="flex justify-center">
                <button
                    onClick={resetArray}
                    className="bg-gray-900 p-3 text-white font-bold rounded-xl text-xl hover:opacity-100 opacity-80 md:text-base mb-10">
                    Generate New Array
                </button>
            </div>
            <div
                className={`grid ${array.length > 180 ? 'gap-0' : 'gap-1 sm:gap-2 md:gap-1'}`}
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(${array.length > 49 ? '3px' : '10px'}, 1fr))`,
                }}
            >
                {array.map((value, index) => (
                    <div className="flex flex-row justify-between items-end" key={index}>
                        <div
                            className={`bg-blue-400 transition-all duration-100 ${activeIndices.includes(index) ? "bg-red-400" : ""}`}
                            style={{
                                height: `${value * 4}px`,
                                width: '100%',
                            }}>
                        </div>
                    </div>
                ))}
            </div>
            <h1 className="text-center text-xl font-bold md:text-lg text-white">Time Taken: {timeTaken} ms</h1>
        </div>

    )
}

export default HeroSection;
