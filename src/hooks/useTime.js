import { useState } from "react";
import { time } from "../helpers";
import useInterval from "./useInterval";

export default function useTime(autoStart = true, offsetTimestamp) {
  const [passedSeconds, setPassedSeconds] = useState(
    time.getSecondsFromExpiry(offsetTimestamp, true) || 0
  );
  const [prevTime, setPrevTime] = useState(new Date());
  const [seconds, setSeconds] = useState(
    passedSeconds + time.getSecondsFromPrevTime(prevTime || 0, true)
  );
  const [isRunning, setIsRunning] = useState(autoStart);

  useInterval(
    () => {
      setSeconds(passedSeconds + time.getSecondsFromPrevTime(prevTime, true));
    },
    isRunning ? 1000 : null
  );

  function start() {
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setIsRunning(true);
    setSeconds(passedSeconds + time.getSecondsFromPrevTime(newPrevTime, true));
  }

  function pause() {
    setPassedSeconds(seconds);
    setIsRunning(false);
  }

  function reset(offset = 0, newAutoStart = true) {
    const newPassedSeconds = time.getSecondsFromExpiry(offset, true) || 0;
    const newPrevTime = new Date();
    setPrevTime(newPrevTime);
    setPassedSeconds(newPassedSeconds);
    setIsRunning(newAutoStart);
    setSeconds(
      newPassedSeconds + time.getSecondsFromPrevTime(newPrevTime, true)
    );
  }

  return {
    ...time.getTimeFromSeconds(seconds),
    start,
    pause,
    reset,
    isRunning
  };
}
