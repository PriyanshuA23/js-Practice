import { SNAKES } from "./snakeData.js";
import { isInsideGrid } from "../utils/boundary_checker.js";
import { delay } from "../utils/delay.js";
import {
  clearScreen,
  createScreen,
  displayScreen,
} from "../utils/screen_setup.js";

let INPUT_BUFF = "m";
// const VALID_KEYSTROKES = ["w", "a", "s", "d"];
const VALID_KEYSTROKES = ["\u001b[A", "\u001b[B", "\u001b[C", "\u001b[D"];
const MOVMENT = { //cleanup and value return
  N: (snake, { w }) => snake.y = ((snake.y - 1) % w + w) % w,
  S: (snake, { w }) => snake.y = (snake.y + 1) % w,
  E: (snake, { h }) => snake.x = (snake.x + 1) % h,
  W: (snake, { h }) => snake.x = ((snake.x - 1) % h + h) % h,
};
const BOUNDED_MOVEMENT = {
  N: (snake) => snake.y--,
  S: (snake) => snake.y++,
  E: (snake) => snake.x++,
  W: (snake) => snake.x--,
};

export const changeheading = {
  N: { "\u001b[A": "N", "\u001b[D": "W", "\u001b[B": "N", "\u001b[C": "E" },
  E: { "\u001b[A": "N", "\u001b[D": "E", "\u001b[B": "S", "\u001b[C": "E" },
  W: { "\u001b[A": "N", "\u001b[D": "W", "\u001b[B": "S", "\u001b[C": "W" },
  S: { "\u001b[A": "S", "\u001b[D": "W", "\u001b[B": "S", "\u001b[C": "E" },
};
// export const changeheading = {
//   N: { W: "N", A: "W", S: "N", D: "E" },
//   E: { W: "N", A: "E", S: "S", D: "E" },
//   W: { W: "N", A: "W", S: "S", D: "W" },
//   S: { W: "S", A: "W", S: "S", D: "E" },
// };

const drawBody = ({ width, height, pixels }, { bodyParts }) => {
  bodyParts
    .toReversed()
    .forEach(({ x, y, icon }) => {
      if (isInsideGrid({ width, height }, { x, y })) pixels[y][x] = icon;
    });
};

const updateScreen = (screen, snake) => {
  const { x, y, icon } = snake.food;
  screen.pixels[y][x] = icon;
  drawBody(screen, snake);
  if (isInsideGrid(screen, snake)) {
    screen.pixels[snake.y][snake.x] = snake.icon;
  }
};

const move = (snake, dimensions) => {
  if (snake.isBounded) {
    return BOUNDED_MOVEMENT[snake.heading](snake);
  }
  MOVMENT[snake.heading](snake, dimensions);
};

const updateBodyCoordinates = ({ bodyParts, x, y }) => {
  bodyParts.pop();
  bodyParts.unshift({ x, y, icon: "🟩" });
};

const updateSnake = (snake, input, dimensions) => {
  if (input === "p") {
    snake.isPause = !snake.isPause;
    return;
  }

  if (VALID_KEYSTROKES.includes(input)) {
    snake.heading = changeheading[snake.heading][input.toUpperCase()];
  }

  if (!snake.isPause) {
    updateBodyCoordinates(snake);
    move(snake, dimensions);
  }
};

const generateValidCoordinates = (height, width, snake) => {
  const foodX = Math.floor(Math.random() * height);
  const foodY = Math.floor(Math.random() * width);
  const isValid = snake
    .bodyParts
    .every((part) => (part.x !== foodX) && (part.y !== foodY));
  console.log([foodX, foodY, isValid]);

  if (isValid) {
    return [foodX, foodY];
  }
  return generateValidCoordinates(height, width, snake);
};

const generateFoodCoordinate = (snake, height, width) => {
  const [x, y] = generateValidCoordinates(height, width, snake);
  snake.food.x = x;
  snake.food.y = y;
};

const isFoodEaten = (snake) =>
  (snake.x === snake.food.x) && (snake.y === snake.food.y);

const createSnakeTail = (snake) => {
  const tail = { ...snake.bodyParts[0] };
  console.log(snake.bodyParts, tail);
  snake.bodyParts.push({ x: 0, y: 0, icon: "**" });
};

export const readInput = async (snake) => {
  for await (const chunk of Deno.stdin.readable) {
    INPUT_BUFF = new TextDecoder().decode(chunk).trim();
    if (snake.isDead) {
      return;
    }
    if (INPUT_BUFF === "p") SNAKES[0].isPause;
  }
};

const performIfFoodEaten = (snake, h, w) => {
  if (isFoodEaten(snake)) {
    snake.score += 10;

    generateFoodCoordinate(snake, h, w);
    createSnakeTail(snake, 1);
  }
};

const isSnakeBiteItself = (snake) => {
  const lengthOfTail = snake.bodyParts.length;
  for (let index = lengthOfTail - 1; index > 0; index--) {
    const condition = (snake.x === snake.bodyParts[index].x) &&
      (snake.y === snake.bodyParts[index].y);
    if (condition) {
      return true;
    }
  }
  return false;
};

const checkIsSnakeDead = (screen, snake) => {
  const condition = snake.isBounded
    ? (!isInsideGrid(screen, snake) || isSnakeBiteItself(snake))
    : isSnakeBiteItself(snake);
  if (condition) {
    snake.isDead = true;
  }
};

const performAction = async ({ snake, screen, h, w }) => {
  clearScreen(screen, snake);
  updateSnake(snake, INPUT_BUFF, { h, w });
  performIfFoodEaten(snake, h, w);
  updateScreen(screen, snake);
  checkIsSnakeDead(screen, snake);
  if (snake.isDead) return;
  displayScreen(screen, snake);
  INPUT_BUFF = "";
  await delay(snake.delayTime);
};

export const startGame = async (snake, h = 10, w = 10) => {
  Deno.stdin.setRaw(true, { cbreak: true });
  readInput(snake);

  const SCREEN = createScreen(+h, +w);
  while (true) {
    await performAction({ snake, screen: SCREEN, h, w });
    if (snake.isDead) {
      throw new Error("snake is Dead");
    }
  }
};
