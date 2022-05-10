import { useState, useEffect, useRef } from "react";

export default function useKeyPress(targetKey, speed = 1000) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false);
  const prevKey = useRef("");

  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    const downHandler = ({ key }) => {
      // checking keep pressing re-rendering

      if (prevKey.current === targetKey) return;

      if (key === targetKey) {
        setKeyPressed(true);
        prevKey.current = key;
      }
    };

    // If released key is our target key then set to false
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
        prevKey.current = "";
        // isReady.current = true;
      }
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]); // Empty array ensures that effect is only run on mount and unmount

  return keyPressed;
}
