import React, { useRef, useState, useEffect } from "react";
import useElementSize from "../hooks/useElementSize";
import useKeyPress from "../hooks/useKeyPress";
import {
  worldStageSprite,
  sprites,
  characters,
  mapTiles
} from "../data/wordMaps";
import Controls from "../Controls";
import Grid from "../Grid";
import "./styles.css";

const character = 0;

const ArrowRight = "right";
const ArrowLeft = "left";
const ArrowUp = "up";
const ArrowDown = "down";
const Space = "space";

export const WorldSelect = (props) => {
  const {
    editorMode = false,
    onLevelSelect = () => null,
    map,
    playerPosition
  } = props;
  const squareRef = useRef(null);
  const { width, height } = useElementSize(squareRef);
  const deltaSize = width / map.size.width;
  const [stuff, setStuff] = useState(map.stuff);
  const [characterPosition, setCharacterPosition] = useState(playerPosition);
  const [onTransitionClose, setOnTransitionClose] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(false);
  const arrowRight = useKeyPress("ArrowRight");
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowUp = useKeyPress("ArrowUp");
  const arrowDown = useKeyPress("ArrowDown");
  const space = useKeyPress(" ");
  const [playerCouldMove, setPlayerCouldMove] = useState(true);
  const [mapSprites, setMapSprites] = useState({});
  const [button, setButton] = useState(null);

  useEffect(() => {
    const tileSprites = mapTiles.inMap.names.map((name, i) => {
      return worldStageSprite(
        i,
        mapTiles.inMap.size,
        map.size,
        {
          width,
          height
        },
        4
      );
    });
    setMapSprites(tileSprites);
  }, [width, height, map]);

  useEffect(() => {
    if (playerCouldMove) {
      if (
        (arrowRight || button === ArrowRight) &&
        characterPosition[ArrowRight]
      ) {
        if (characterPosition.x !== map.nodes[characterPosition.right].x) {
          setCharacterPosition(map.nodes[characterPosition.right]);
          setPlayerCouldMove(false);
          setButton(null);
        }
      }

      if ((arrowLeft || button === ArrowLeft) && characterPosition[ArrowLeft]) {
        if (characterPosition.x !== map.nodes[characterPosition.left].x) {
          setCharacterPosition(map.nodes[characterPosition.left]);
          setPlayerCouldMove(false);
          setButton(null);
        }
      }

      if ((arrowUp || button === ArrowUp) && characterPosition[ArrowUp]) {
        if (characterPosition.y !== map.nodes[characterPosition.up].y) {
          setCharacterPosition(map.nodes[characterPosition.up]);
          setPlayerCouldMove(false);
          setButton(null);
        }
      }

      if ((arrowDown || button === ArrowDown) && characterPosition[ArrowDown]) {
        if (characterPosition.y !== map.nodes[characterPosition.down].y) {
          setCharacterPosition(map.nodes[characterPosition.down]);
          setPlayerCouldMove(false);
          setButton(null);
        }
      }
    }
    if (characterPosition.isLevel && (space || button === Space)) {
      setSelectedLevel(true);
    }
  }, [
    arrowRight,
    arrowLeft,
    arrowUp,
    arrowDown,
    space,
    button,
    playerCouldMove
  ]);

  const addStuff = (x, y) => {
    const newStuff = [...stuff];
    newStuff.push({
      x,
      y,
      type: "level",
      name: 10
    });
    setStuff(newStuff);
  };

  const marioStyle = worldStageSprite(
    character + 1,
    {
      width: 16
    },
    map.size,
    {
      width,
      height
    }
  );

  return (
    <div
      className={`select-screen ${onTransitionClose ? "animated" : ""}`}
      onTransitionEnd={(e) => {
        const { propertyName, pseudoElement } = e;
        if (propertyName === "width" && pseudoElement === "::after")
          onLevelSelect(characterPosition);
      }}
    >
      {!onTransitionClose && (
        <>
          <span
            onAnimationEnd={() => setOnTransitionClose(true)}
            className={`title ${
              selectedLevel ? "animate__animated animate__bounceOutLeft" : ""
            }`}
          >
            Mapa Mundo
          </span>
          <div
            className={`border ${
              selectedLevel ? "animate__animated animate__bounceOutRight" : ""
            }`}
          >
            <div className="world-backgroud" ref={squareRef}>
              <img
                onClick={(e) => console.log(`x:${e.clientX} y:${e.clientY}`)}
                className="map1"
                src="/assets/images/map-1.gif"
                alt="map"
              />
              {stuff.map((e) => {
                const blockedLevel = worldStageSprite(
                  e.type === "level"
                    ? e.name
                    : mapTiles.inMap.names.findIndex((t) => t === e.name) + 1,
                  sprites.sm.size,
                  map.size,
                  {
                    width,
                    height
                  }
                );
                const styles =
                  e.type === "level"
                    ? blockedLevel.style
                    : mapSprites[1]?.style || blockedLevel.style;
                return (
                  <div
                    key={`${e.x}-${e.y}-${e.name}`}
                    className={
                      e.type === "level" ? "blocked-level" : "map-tiles"
                    }
                    style={{
                      ...styles,
                      top: e.y * deltaSize,
                      left: e.x * deltaSize
                    }}
                  />
                );
              })}
              <div
                className="faces-in-map"
                onTransitionEnd={() => setPlayerCouldMove(true)}
                style={{
                  backgroundPosition: `${
                    characters.inMap.initCoordenates.x -
                    character * characters.inMap.size.width
                  }px ${characters.inMap.initCoordenates.y}px`,
                  ...marioStyle.style,
                  top: map.stuff[character]?.y
                    ? characterPosition.y * deltaSize
                    : -1800,
                  left: characterPosition.x * deltaSize
                }}
              />

              {editorMode && (
                <>
                  <Grid
                    onClick={(x, y) => addStuff(x, y)}
                    deltaSize={deltaSize}
                    baseSize={8}
                    cols={60}
                    rows={19}
                  />
                  <pre>{JSON.stringify(stuff, undefined, 2)}</pre>
                </>
              )}
            </div>
          </div>
          <Controls
            width="200"
            onClick={(key) => setButton(key)}
            className={`${
              selectedLevel ? "animate__animated animate__fadeOutUp" : ""
            }`}
          />
        </>
      )}
    </div>
  );
};
// <img className="dot" src="/assets/images/blue-dot.png" alt="dot" />
// <img className="map" src="/assets/images/select-world.png" alt="map" />
export default WorldSelect;
