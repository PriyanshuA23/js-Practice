import { snakes } from "./snakeData.js";

Deno.stdin.setRaw(true);

let input = "m";

const changeDirection = {
  N: { W: "N", A: "W", S: "N", D: "E" },
  E: { W: "N", A: "E", S: "S", D: "E" },
  W: { W: "N", A: "W", S: "S", D: "W" },
  S: { W: "S", A: "W", S: "S", D: "E" },
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
    () => Array.from({ length: width }, () => "  "),
  );
};

const clearScreen = (screen, snake) => {
  const tailLength = snake.tails.length;
  const { x, y } = snake.tails[tailLength - 1];
  screen[y][x] = "  ";
  const foodX = snake.food.x;
  const foodY = snake.food.y;
  screen[foodY][foodX] = "  ";
};

const displayScreen = (screen, snake) => {
  console.clear();
  const boundary = "**".repeat(screen[0].length).split("");
  const boundedScreen = [boundary, ...screen, boundary];
  console.log(
    boundedScreen.map((ele) => ["*", ...ele, "*"].join("")).join("\n"),
  );
  if (snake.isDead) {
    console.log("GAME OVER");
    console.log("FINAL SCORE: ", snake.score);
  } else {
    console.log("SCORE: ", snake.score);
  }
};

const drawTails = (screen, snake) => {
  snake.tails.toReversed().forEach((tail) => {
    if (isInsideGrid(screen, tail)) {
      screen[tail.y][tail.x] = tail.icon;
    }
  });
};

const drawFood = (screen, { x, y, icon }) => {
  screen[y][x] = icon;
};

const updateScreen = (screen, snake) => {
  drawFood(screen, snake.food);
  drawTails(screen, snake);
  if (isInsideGrid(screen, snake)) {
    screen[snake.y][snake.x] = snake.icon;
  }
};

const move = (snake) => {
  const movement = {
    N: (snake) => snake.y--,
    S: (snake) => snake.y++,
    E: (snake) => snake.x++,
    W: (snake) => snake.x--,
  };

  movement[snake.direction](snake);
};

const updateTailCoordinates = (snake) => {
  for (let index = snake.tails.length - 1; index > 0; index--) {
    [snake.tails[index].x, snake.tails[index].y] = [
      snake.tails[index - 1].x,
      snake.tails[index - 1].y,
    ];
  }
  [snake.tails[0].x, snake.tails[0].y] = [snake.x, snake.y];
};

const updateSnake = (snake, rawInput) => {
  const input = rawInput;

  if (input === "p") snake.isPause = !snake.isPause;
  else {
    const inputs = ["w", "a", "s", "d"];
    if (inputs.includes(input)) {
      snake.direction = changeDirection[snake.direction][input.toUpperCase()];
    }

    if (!snake.isPause) {
      updateTailCoordinates(snake);
      move(snake);
    }
  }
};

const generateRandomCoordinates = (height, width) => {
  const xCoordinateOfFood = Math.floor(Math.random() * height);
  const yCoordinateOfFood = Math.floor(Math.random() * width);

  return [xCoordinateOfFood, yCoordinateOfFood];
};

const generateFoodCoordinate = (snake, height, width) => {
  let isUniqueCoordinates = false;
  let x = 0;
  let y = 0;

  while (!isUniqueCoordinates) {
    [x, y] = generateRandomCoordinates(height, width);
    isUniqueCoordinates = snake.tails.every((tail) => {
      return (tail.x !== x) && (tail.y !== y);
    });
  }

  snake.food.x = x;
  snake.food.y = y;
};

const isFoodEaten = (snake) => {
  return (snake.x === snake.food.x) && (snake.y === snake.food.y);
};

const createSnakeTail = (snake, size) => {
  for (let index = 0; index <= size - 1; index++) {
    const tail = { ...snake.tails[0] };
    snake.tails.push(tail);
  }
};

export const readFromStream = async (snake) => {
  for await (const chunk of Deno.stdin.readable) {
    input = new TextDecoder().decode(chunk).trim();
    if (snake.isDead) {
      return;
    }
    if (input === "p") snakes[0].isPause;
  }
};

const delay = (time) => {
  return new Promise((res) => {
    setTimeout(() => res(), time);
  });
};

const performIfFoodEaten = (snake, h, w) => {
  if (isFoodEaten(snake)) {
    snake.score += 10;
    generateFoodCoordinate(snake, h, w);
    createSnakeTail(snake, 1);
  }
};

const isSnakeBiteItself = (snake) => {
  const lengthOfTail = snake.tails.length;
  for (let index = lengthOfTail - 1; index > 0; index--) {
    const condition = (snake.x === snake.tails[index].x) &&
      (snake.y === snake.tails[index].y);
    if (condition) {
      return true;
    }
  }
};

const performIfSnakeOnBoundary = (screen, snake) => {
  const condition = !isInsideGrid(screen, snake) ||
    isSnakeBiteItself(snake);
  if (condition) {
    snake.isDead = true;
  }
};

const performAction = async (args) => {
  const { snake, screen, h, w, t } = args;
  clearScreen(screen, snake);
  updateSnake(snake, input);
  performIfFoodEaten(snake, h, w);
  updateScreen(screen, snake);
  performIfSnakeOnBoundary(screen, snake);
  displayScreen(screen, snake);
  input = "";
  await delay(t);
};

export const startGame = async (snakes, h = 10, w = 10, t = 1000, s = 2) => {
  const screen = createScreen(h, w);
  createSnakeTail(snakes[0], s);
  readFromStream(snakes[0]);
  while (true) {
    const args = { snake: snakes[0], screen, h, w, t };
    await performAction(args);
    if (snakes[0].isDead) {
      Deno.exit(0);
      break;
    }
  }
};

await startGame(snakes, ...Deno.args);
