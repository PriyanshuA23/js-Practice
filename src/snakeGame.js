const HEIGHT = 10;
const WIDTH = 10;

const screen = Array.from(
  { length: HEIGHT },
  () => Array.from({ length: WIDTH }, () => "⬜"),
);

const snake = "⬛".repeat(1).split("");

const clearScreen = () => {
  for (const row in screen) {
    for (const col in screen[row]) {
      screen[row][col] = "⬜";
    }
  }
};

const displayScreen = () => {
  console.log(screen.map((ele) => ele.join("")).join("\n"));
};

const printSnakeOnScreen = (snake) => {
  screen[snake.y][snake.x] = snake.icon;
};

const moveSnake = (snake) => {
  setInterval(() => {
    if (snake.y >= 5) snake.direction = "x";
    if (snake.x >= 5) snake.direction = "y";
    if (snake.x >= 5 && snake.y >= 5) snake.direction = "n";

    snake[snake.direction] = (snake[snake.direction] + 1) %
      screen.length;

    console.clear();

    clearScreen();
    printSnakeOnScreen(snake);
    displayScreen();
  }, 200);
};

moveSnake({
  x: 0,
  y: 0,
  direction: "x",
  icon: "⬛"
});
