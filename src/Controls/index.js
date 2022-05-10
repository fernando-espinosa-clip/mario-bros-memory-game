import React from "react";
import {
  HiArrowNarrowLeft,
  HiArrowNarrowDown,
  HiArrowNarrowUp,
  HiArrowNarrowRight
} from "react-icons/hi";
import "./styles.css";

const Controls = (props) => {
  const { onClick = () => null, className } = props;
  return (
    <div className={`controls ${className}`}>
      <label>Controles</label>
      <div className="buttons">
        <button className="space" onClick={() => onClick("space")}>
          Space ( select )
        </button>
      </div>
      <div className="buttons">
        <div className="row">
          <button onClick={() => onClick("up")}>
            <HiArrowNarrowUp />
          </button>
        </div>
        <div className="row">
          <button onClick={() => onClick("left")}>
            <HiArrowNarrowLeft />
          </button>
          <button onClick={() => onClick("down")}>
            <HiArrowNarrowDown />
          </button>
          <button onClick={() => onClick("right")}>
            <HiArrowNarrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
