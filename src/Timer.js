import { useEffect, useRef } from "react";

const Timer = (props) => {
  const { onTime, loopTime = 1000 } = props;
  let intervalRef = useRef();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      onTime();
    }, loopTime);
    return () => {
      console.log("tan tan");
      clearInterval(intervalRef.current);
    };
  }, []);

  return null;
};

export default Timer;
