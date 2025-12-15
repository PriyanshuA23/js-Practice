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
  console.log(screen.map((ele) => ele.join("")).join("\n"));
};

const updateScreen = (screen, snakes) => {
  for (const snake of snakes) {
    screen[snake.y][snake.x] = snake.icon;
  }
};

const updateSnake = (screen, snakes) => {
  for (const snake of snakes) {
    if (snake.y >= 5) snake.direction = "x";
    if (snake.x >= 5) snake.direction = "y";
    if (snake.x >= 5 && snake.y >= 5) snake.direction = "n";
    snake[snake.direction] = (snake[snake.direction] + 1) %
      screen.length;
  }
};

const snakes = [
  {
    x: 0,
    y: 0,
    direction: "x",
    icon: "🐍",
  },
];

const moveSnake = (snakes, height = 10, width = 10) => {
  const screen = createScreen(height, width);

  setInterval(() => {
    clearScreen(screen);
    updateSnake(screen, snakes);
    updateScreen(screen, snakes);
    displayScreen(screen);
  }, 200);
};

moveSnake(snakes, 6, 6);
