import React, { useRef, useState, useEffect } from "react";

const FrameDraw = (props) => {
  const { isRunning = true, speed = 1000 } = props;
  const requestRef = useRef();
  const lastUpdateTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  const frameRate = useRef(0);
  const [currentFrameRate, setCurrentFrameRate] = useState(0);

  useEffect(() => {
    const update = (time) => {
      requestRef.current = requestAnimationFrame(update);
      if (!isRunning) {
        return;
      }
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = time;
      }
      const deltaTime = time - lastUpdateTimeRef.current;
      progressTimeRef.current += deltaTime;
      if (progressTimeRef.current > speed) {
        // console.log(frameRate.current);
        setCurrentFrameRate(frameRate.current);
        progressTimeRef.current = 0;
        frameRate.current = -1;
      }
      lastUpdateTimeRef.current = time;
      frameRate.current++;
    };
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, speed]);

  return (
    <>
      <div>{currentFrameRate}</div>
    </>
  );
};

function getTransitionEndEventName() {
  var transitions = {
    transition: "transitionend",
    OTransition: "oTransitionEnd",
    MozTransition: "transitionend",
    WebkitTransition: "webkitTransitionEnd"
  };
  let bodyStyle = document.body.style;
  for (let transition in transitions) {
    if (bodyStyle[transition] != undefined) {
      return transitions[transition];
    }
  }
}

const useTimeLapse = (speed = 1000, startRunning = false) => {
  const requestRef = useRef();
  const lastUpdateTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  // const [isRunning, setIsRunning] = useState(startRunning);
  const isRunning = useRef(startRunning);

  useEffect(() => {
    const update = (time) => {
      requestRef.current = requestAnimationFrame(update);
      if (!isRunning) {
        return;
      }
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = time;
      }
      const deltaTime = time - lastUpdateTimeRef.current;
      progressTimeRef.current += deltaTime;
      if (progressTimeRef.current > speed) {
        // console.log(frameRate.current);
        isRunning.current = false;
        progressTimeRef.current = 0;
        console.log("done");
      }
      lastUpdateTimeRef.current = time;
    };
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed]);

  const start = () => {
    isRunning.current = true;
  };

  return [isRunning.current, start];
};
