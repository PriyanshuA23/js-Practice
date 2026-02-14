const EMPTY_CELL = "  ";

export const createScreen = (height, width) => ({
  height,
  width,
  pixels: Array.from(
    { length: height },
    () => Array.from({ length: width }, () => EMPTY_CELL),
  ),
});

export const clearScreen = (screen, { bodyParts }) => {
  const { x, y } = bodyParts.at(-1);
  screen.pixels[y][x] = EMPTY_CELL;
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
  console.log("⬆️: up   ⬅️: left   ⬇️: down   ➡️: right   𝗣: pause");
};

export const displayScreen = (screen, snake) => {
  if (snake.isDead) return;
  drawScreen(screen);
  displayStatus(snake);
};
