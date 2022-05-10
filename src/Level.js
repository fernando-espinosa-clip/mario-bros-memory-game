import React, { useEffect, useState } from "react";
import "./styles.css";
import { prepareLevel, calculateCoins } from "./helpers";
import Score from "./Score";
import useTime from "./hooks/useTime";
import Board from "./Board";

export default function Level(props) {
  const { selectedLevel, onWin } = props;
  const levelNumber = selectedLevel?.level || 1;

  const [level, setLevel] = useState(prepareLevel(levelNumber));
  const [openCards, setOpenCards] = useState(0);
  const [card1, setCard1] = useState(false);
  const [card2, setCard2] = useState(false);
  const [couldPlay, setCouldPlay] = useState(true);
  const [coins, setCoins] = useState(0);
  const [startTransition, setStartTransition] = useState(false);
  const [drawCards, setDrawCards] = useState(false);
  const [win, setWin] = useState(false);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset
  } = useTime();

  const time = seconds + minutes * 60;

  const flipCard = (index) => {
    if (!couldPlay) return false;
    if (!level.board[index].isOpen) {
      setOpenCards(openCards + 1);
      if (card1 === false) {
        setCard1(index);
      } else {
        setCard2(index);
      }
      level.board[index].isOpen = true;
      setLevel({ ...level });
    }
  };

  useEffect(() => {
    setStartTransition(true);
  }, []);

  useEffect(() => {
    if (card1 !== false && card2 !== false && couldPlay) {
      if (level.board[card1].character !== level.board[card2].character) {
        setCouldPlay(false);
        setTimeout(() => {
          const newLevel = { ...level };
          newLevel.board[card1].isOpen = false;
          newLevel.board[card2].isOpen = false;
          setOpenCards(openCards - 2);
          setCard1(false);
          setCard2(false);
          setLevel({ ...newLevel });
          setCouldPlay(true);
        }, 1000);
      } else {
        setCard1(false);
        setCard2(false);
        setCoins(calculateCoins(level.level, time, coins));
      }
    }
    if (openCards === level.board.length) {
      pause();
      setWin(true);
    }
  });

  useEffect(() => {
    if (win) {
      setTimeout(onWin, 3000);
    }
  }, [win, onWin]);

  return (
    <div
      className={`background ${startTransition ? "start" : ""}`}
      style={{ backgroundImage: `url(${selectedLevel.background})` }}
      onTransitionEnd={() => {
        setTimeout(() => setDrawCards(true), 600);
      }}
    >
      {drawCards && (
        <>
          <Score level={level.level} coins={coins} time={time} />
          <Board
            couldPlay={couldPlay}
            setLevel={setLevel}
            level={level}
            card1={card1}
            card2={card2}
            flipCard={flipCard}
            transitionClass={win ? "animate__animated animate__zoomOutUp" : ""}
            onWin={() => console.log("gane")}
          />
        </>
      )}
      <div />
    </div>
  );
}
