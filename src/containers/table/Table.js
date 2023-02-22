import React, { useState, useEffect } from "react";

import { MODES, CELLS_PER_ROW } from "../../constants";
import { getPresets } from "../../services";
import HoveredSquares from "../hoveredSquares/HoveredSquares";
import "./style.scss";

const Table = () => {
  const [presets, setPresets] = useState([]);
  const [hoverLocked, setHoverLocked] = useState(false);
  const [mode, setMode] = useState("");
  const [rows, setRows] = useState([]);
  const [cells, setCells] = useState([]);
  const [cellSize, setCellSize] = useState(MODES.HARD);
  const [hoveredCells, setHoveredCells] = useState([]);

  const fetchPresets = async () => {
    const _presets = await getPresets();
    setPresets(_presets);
  };

  const handleHoverLock = () => {
    setHoverLocked(!hoverLocked);
  };

  const handleModeChange = (e) => {
    const selectedMode = presets.find((el) => el?.name === e.target.value);
    if (selectedMode) {
      setMode(selectedMode.name);
      setCellSize(selectedMode.field);
      setHoveredCells([]);
    }
  };

  const handleCellHover = (rowIndex, cellIndex) => {
    if (!hoverLocked) return;

    const currentCells = [...hoveredCells];

    if (
      !currentCells.find(
        (el) => el.rowIndex === rowIndex && el.cellIndex === cellIndex
      )
    ) {
      currentCells.push({ rowIndex, cellIndex });
    } else {
      const currentIndex =
        currentCells.findIndex(
          (el) => el.rowIndex === rowIndex && el.cellIndex === cellIndex
        ) || 0;
      currentCells.splice(currentIndex, 1);
    }
    setHoveredCells(currentCells);
  };

  const generateTable = () => {
    const selectedMode = presets.find((item) => item?.name === mode);
    const cellsCount = selectedMode ? selectedMode.field : MODES.HARD;
    const rowsCount = Math.ceil(cellsCount / CELLS_PER_ROW);

    const _rows = new Array(rowsCount).fill("", 0, rowsCount);
    const _cells = new Array(cellsCount).fill(
      "",
      0,
      Math.ceil(cellsCount / rowsCount)
    );

    setRows(_rows);
    setCells(_cells);
  };

  useEffect(() => {
    fetchPresets();
  }, []);

  useEffect(() => {
    generateTable();
  }, [mode]);

  return (
    <>
      <div className="table-wrapper">
        <div className="mode-selection">
          <select
            name="mode"
            className="mode-options"
            onChange={handleModeChange}
          >
            <option value="">{mode || "Pick mode"}</option>
            {presets.map((preset, i) => (
              <option key={i} value={preset.name}>
                {preset.name}
              </option>
            ))}
          </select>

          <button className="lock-hover-btn" onClick={handleHoverLock}>
            {hoverLocked ? "PAUSE" : "START"}
          </button>
        </div>

        <table className="squares-table" cellPadding="0" cellSpacing="0">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="squares-table-row">
                {cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`squares-table-cell ${
                      hoveredCells.find(
                        (_cell) =>
                          _cell.rowIndex === rowIndex &&
                          _cell.cellIndex === cellIndex
                      )
                        ? "blue-bg"
                        : ""
                    }`}
                    style={{
                      width: `${cellSize}vw`,
                      height: `${cellSize}vh`,
                    }}
                    onMouseEnter={() => handleCellHover(rowIndex, cellIndex)}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <HoveredSquares squares={hoveredCells} />
    </>
  );
};

export default Table;
