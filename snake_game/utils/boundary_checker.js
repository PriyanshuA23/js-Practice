export const isInBetween = (value, min, max) => min < value && value < max;
export const isInsideGrid = ({ width, height }, { x, y }) =>
  isInBetween(x, -1, width) && isInBetween(y, -1, height);
