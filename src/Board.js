import React, { useEffect, useState } from "react";
import "./styles.css";
import styles from "./styles";

const Board = (props) => {
  const {
    levelNumber,
    couldPlay,
    level,
    card1,
    card2,
    flipCard,
    transitionClass
  } = props;
  const classes = styles({ levelNumber });
  const [initState, setInitState] = useState(true);

  useEffect(() => {
    if (initState) {
      setTimeout(() => {
        setInitState(false);
      }, 1200);
    }
  }, [initState]);

  return (
    <div className={`board ${transitionClass}`}>
      {level.board.map((card, index) => {
        let style = card.isOpen
          ? {
              ...classes.characters,
              ...classes[card.character]
            }
          : classes.backCard;
        const shakeCss =
          (card1 === index || card2 === index) && !couldPlay
            ? "card animate__animated animate__shakeX"
            : "";
        const drawCards = initState
          ? "card animate__animated animate__fadeInLeftBig"
          : "";

        return (
          <div
            key={card.id}
            className={`characters card ${shakeCss} ${drawCards}`}
            style={style}
            onClick={() => flipCard(index)}
          />
        );
      })}
    </div>
  );
};

export default Board;
