const API_URI = process.env.REACT_APP_API_URI;
const MODES = Object.freeze({
  'EASY': 5,
  'NORMAL': 15,
  'HARD': 25,
});
const CELLS_PER_ROW = 5;

export {
  API_URI,
  MODES,
  CELLS_PER_ROW,
};
