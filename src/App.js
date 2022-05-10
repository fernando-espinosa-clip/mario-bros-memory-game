import React, { useState, useCallback } from "react";
import WorldSelect from "./WorldSelect/index";
import { maps } from "./data/wordMaps";
import Level from "./Level";
import "./styles.css";

export const App = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [animationState, setAnimationState] = useState(true);
  const [mapData, setMapData] = useState(maps.pipeland);
  const [playerPosition, setPlayerPosition] = useState(mapData.nodes.pipe1);
  const onWin = useCallback(() => {
    const newMapData = { ...mapData };
    const stuff = newMapData.stuff.filter(function (value) {
      return value.name !== selectedLevel.level;
    });
    newMapData.stuff = stuff;
    newMapData.nodes[selectedLevel.id].passed = true;
    setMapData(newMapData);
    setSelectedLevel(null);
    setAnimationState(true);
  }, [mapData, selectedLevel]);
  return (
    <>
      <div
        transition-style={animationState ? "in:circle:center" : ""}
        className={`${selectedLevel ? "app" : ""}`}
        onTransitionEnd={() =>
          animationState ? setTimeout(() => setAnimationState(null), 400) : ""
        }
      >
        {!selectedLevel && (
          <WorldSelect
            map={mapData}
            playerPosition={playerPosition}
            onLevelSelect={(level) => {
              console.log(level);
              setPlayerPosition(level);
              setSelectedLevel(level);
            }}
          />
        )}
        {selectedLevel && <Level selectedLevel={selectedLevel} onWin={onWin} />}
      </div>
    </>
  );
};

export default App;
