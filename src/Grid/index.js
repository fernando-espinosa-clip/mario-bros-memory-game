import React from "react";
import "./styles.css";

export const Grid = (props) => {
  const {
    deltaSize,
    baseSize,
    cols = 0,
    rows: rowNumber = 0,
    onClick = () => null
  } = props;
  const columns = [...Array(cols).keys()];
  const rows = [...Array(rowNumber).keys()];
  return (
    <>
      {columns.map((c) => {
        return rows.map((r) => {
          const gridSize = baseSize * deltaSize;
          const style = {
            top: r * gridSize,
            left: c * gridSize,
            width: gridSize,
            height: gridSize
          };
          return (
            <div
              onClick={() => onClick(c * baseSize, r * baseSize, gridSize)}
              key={`${c}-${r}`}
              className="grid-element"
              style={style}
            />
          );
        });
      })}
    </>
  );
};

export default Grid;
