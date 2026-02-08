const EMPTY_CELL = "  ";

export const createScreen = (height, width) => ({
  height,
  width,
  pixels: Array.from(
    { length: height },
    () => Array.from({ length: width }, () => EMPTY_CELL),
  ),
});

export const clearScreen = (screen, { bodyParts, food }) => {
  const { x, y } = bodyParts.at(-1);
  screen.pixels[y][x] = EMPTY_CELL;
  screen.pixels[food.y][food.x] = EMPTY_CELL;
};

const drawScreen = (screen) => {
  const boundary = `*${"**".repeat(screen.width)}*`;

  console.clear();
  console.log(boundary);
  console.log(screen.pixels.map((row) => `*${row.join("")}*`).join("\n"));
  console.log(boundary);
};

const displayStatus = ({ isDead, score }) => {
  if (isDead) {
    console.log("GAME OVER");
    console.log("FINAL SCORE: ", score);
    return;
  }

  console.log("SCORE: ", score, "\n");
  console.log("w: up    a: left   s: down   d: right    p: pause");
};

export const displayScreen = (screen, snake) => {
  drawScreen(screen);
  displayStatus(snake);
};
