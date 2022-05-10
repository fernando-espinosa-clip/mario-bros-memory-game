import React from "react";
import "./styles.css";

const Score = (props) => {
  const { level, coins, time } = props;

  return (
    <div className="timer">
      <span className="score">
        <img className="coin" src="/assets/images/coin-score.png" alt="coins" />{" "}
        <span className="x">x</span>
        <span className="number">{`${coins}`.padStart(6, "0")}</span>
      </span>
      <span className="time">
        <span className="number">Mundo {level}</span>
      </span>
      <span className="time" style={{ width: 180 }}>
        <img className="clock" src="/assets/images/clock.png" alt="clock" />
        <span className="number">{`${time}`.padStart(5, "0")}</span>
      </span>
    </div>
  );
};

export default Score;
