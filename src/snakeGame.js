const changeDirection = {
  N: { L: "W", R: "E" },
  E: { L: "N", R: "S" },
  W: { L: "S", R: "N" },
  S: { L: "W", R: "E" },
};

function isBetween(value, min, max) {
  return min < value && value < max;
}

const isInsideGrid = (screen, { x, y }) => {
  const maxX = screen[0].length;
  const maxY = screen.length;
  return isBetween(x, -1, maxX) && isBetween(y, -1, maxY);
};

const createScreen = (height, width) => {
  return Array.from(
    { length: height },
    () => Array.from({ length: width }, () => "⬜"),
  );
};

const clearScreen = (screen) => {
  for (const row in screen) {
    for (const col in screen[row]) {
      screen[row][col] = "⬜";
    }
  }
};

const displayScreen = (screen) => {
  console.clear();
  const boundary = "**".repeat(screen.length).split("");
  const boundedScreen = [boundary, ...screen, boundary];
  console.log(
    boundedScreen.map((ele) => ["*", ...ele, "*"].join("")).join("\n"),
  );
};

const updateScreen = (screen, snakes) => {
  for (const snake of snakes) {
    if (isInsideGrid(screen, snake)) {
      screen[snake.y][snake.x] = snake.icon;
    }
  }
};

const move = (snake) => {
  if (snake.direction === "N") {
    snake.y--;
  }
  if (snake.direction === "S") {
    snake.y++;
  }
  if (snake.direction === "E") {
    snake.x++;
  }
  if (snake.direction === "W") {
    snake.x--;
  }
};

const updateSnake = (screen, snakes, input) => {
  for (const snake of snakes) {
    if (input === "L" || input === "R") {
      snake.direction = changeDirection[snake.direction][input];
    }
    move(snake);
  }
};

const snakes = [
  {
    x: 5,
    y: 5,
    direction: "W",
    icon: "🐍",
  },
];

const startGame = (snakes, height = 10, width = 10) => {
  const screen = createScreen(height, width);
  updateScreen(screen, snakes);
  displayScreen(screen);

  while (isInsideGrid(screen, snakes[0])) {
    const input = prompt("enter").toUpperCase();
    clearScreen(screen);
    updateSnake(screen, snakes, input);
    updateScreen(screen, snakes);
    displayScreen(screen);
  }
  
  console.log("YOU LOOSE");
};

startGame(snakes);
