import React from "react";
import "./style.scss";

const HoveredSquares = ({ squares }) => (
  <div className="hovered-squares-container">
    {squares.map((el, i) => (
      <div key={i} className="hovered-square">
        row {el.rowIndex + 1 || el.rowIndex - 1}{" "}
        col {el.cellIndex + 1 || el.cellIndex - 1}
      </div>
    ))}
  </div>
);

export default HoveredSquares;
