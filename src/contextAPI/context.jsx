import { createContext, useState, useRef } from "react";

const SortContext = createContext();

const SortContextProvider = ({ children }) => {

    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const isSortingRef = useRef(false);
    const [activeIndices, setActiveIndices] = useState([]);
    const [value, setValue] = useState(50);
    const [timeTaken, setTimeTaken] = useState(0);
    const timeoutRef = useRef(null);

    const generateArray = (size) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    };

    //algorithms
    const bubbleSort = async () => {
        let arr = [...array];
        let n = array.length;

        let swapped;

        const startTime = performance.now();

        for (let i = 0; i < n - 1; i++) {
            //exit if sorting stopped
            if (!isSortingRef.current) return;
            swapped = false;

            for (let j = 0; j < n - i - 1; j++) {
                //comparison indexes
                setActiveIndices([j, j + 1]);

                //swap
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapped = true;
                    //updating the array
                    setArray([...arr]);
                }
                //visualisation
                await new Promise((resolve) => {
                    timeoutRef.current = setTimeout(resolve, 50);
                });
            }
            //optimized bubble sort
            if (!swapped) {
                break;
            }
        }

        //perfomance calculation
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        //reset values
        setActiveIndices([]);
        setIsSorting(false);

        //set time taken by algo
        setTimeTaken(timeTaken.toFixed(2));
    };

    const selectionSort = async () => {
        let arr = [...array];
        let n = array.length;

        const startTime = performance.now();

        for (let i = 0; i < n - 1; i++) {
            //exit if sorting stopped
            if (!isSortingRef.current) return;

            let min_idx = i;

            for (let j = i + 1; j < n; j++) {
                //highlight active indexes
                setActiveIndices([min_idx, j]);

                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
                //visualization
                await new Promise((resolve) => {
                    timeoutRef.current = setTimeout(resolve, 50);
                });
            }

            //swap
            if (min_idx !== i) {
                [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
                setArray([...arr]);
            }
        }
        //perfomance calculation
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        //reset values
        setActiveIndices([]);
        setIsSorting(false);
        setTimeTaken(timeTaken.toFixed(2));
    }

    const insertionSort = async () => {
        let arr = [...array];
        let n = array.length;

        const startTime = performance.now();

        for (let i = 1; i < n; i++) {
            //exit if sorting stopped
            if (!isSortingRef.current) return;

            let key = arr[i];
            let j = i - 1;

            setActiveIndices([i]);

            while (j >= 0 && arr[j] > key) {
                //hightlight compared indexes
                setActiveIndices([i, j]);
                arr[j + 1] = arr[j];
                j = j - 1;

                //visualization
                await new Promise((resolve) => {
                    timeoutRef.current = setTimeout(resolve, 50);
                });
            }
            arr[j + 1] = key;
            setArray([...arr]);

            //array already sorted
            setActiveIndices([j + 1]);
            await new Promise((resolve) => {
                timeoutRef.current = setTimeout(resolve, 50);
            });
        }

        //perfomance calculation
        const endTime = performance.now();
        const timeTaken = endTime - startTime;

        //reset values
        setActiveIndices([]);
        setIsSorting(false)
        setTimeTaken(timeTaken.toFixed(2));
    }

    const mergeSort = async (arr, left, right) => {
        if (left >= right) return;

        const middle = Math.floor((left + right) / 2);

        await mergeSort(arr, left, middle);
        await mergeSort(arr, middle + 1, right);

        await merge(arr, left, middle, right);
    };

    const merge = async (arr, left, middle, right) => {
        let leftPart = arr.slice(left, middle + 1);
        let rightPart = arr.slice(middle + 1, right + 1);

        let i = 0, j = 0, k = left;

        // Highlight halves that are being merged
        setActiveIndices([left, right]);

        while (i < leftPart.length && j < rightPart.length) {
            if (leftPart[i] <= rightPart[j]) {
                arr[k] = leftPart[i];
                i++;
            } else {
                arr[k] = rightPart[j];
                j++;
            }
            setArray([...arr]);
            await new Promise((resolve) => (timeoutRef.current = setTimeout(resolve, 10)));
            k++;
        }

        while (i < leftPart.length) {
            arr[k] = leftPart[i];
            setArray([...arr]);
            await new Promise((resolve) => (timeoutRef.current = setTimeout(resolve, 10)));
            i++;
            k++;
        }

        while (j < rightPart.length) {
            arr[k] = rightPart[j];
            setArray([...arr]);
            await new Promise((resolve) => (timeoutRef.current = setTimeout(resolve, 10)));
            j++;
            k++;
        }

        // Reset highlighting after merge
        setActiveIndices([]);
    };



    //reset array
    const resetArray = () => {
        setIsSorting(false);
        setActiveIndices([]);
        isSortingRef.current = false;
        setTimeTaken(0);
        clearTimeout(timeoutRef.current);
        const newArray = generateArray(value);
        setArray(newArray);
    }

    //handlers
    const handleBubbleSort = () => {
        if (isSorting) return;
        setIsSorting(true);
        isSortingRef.current = true;
        bubbleSort();
    }

    const handleSelectionSort = () => {
        if (isSorting) return;
        setIsSorting(true);
        isSortingRef.current = true;
        selectionSort();
    }

    const handleInsertionSort = () => {
        if (isSorting) return;
        setIsSorting(true);
        isSortingRef.current = true;
        insertionSort();
    }

    const handleMergeSort = async () => {
        if (isSorting) return;
        setIsSorting(true);
        const startTime = performance.now();
        await mergeSort(array, 0, array.length - 1);
        const endTime = performance.now();
        setTimeTaken((endTime-startTime).toFixed(2));
        setIsSorting(false);
    };

    const handleSliderChange = (e) => {
        setValue(e.target.value);
        console.log(value);
    }

    return (
        <SortContext.Provider value={{ array, setArray, isSorting, activeIndices, handleBubbleSort, resetArray, value, handleSliderChange, handleSelectionSort, timeTaken, handleInsertionSort, handleMergeSort }}>
            {children}
        </SortContext.Provider>
    )
}

export { SortContext, SortContextProvider }