import { isInsideGrid } from "./utils/boundary_checker.js";
import { delay } from "./utils/delay.js";
import {
  clearScreen,
  createScreen,
  displayScreen,
} from "./utils/screen_setup.js";

import { SNAKES } from "./snakeData.js";
Deno.stdin.setRaw(true);

let HEIGHT = 10;
let WIDTH = 10;
let INPUT_BUFF = "m";
const VALID_KEYSTROKES = ["w", "a", "s", "d"];
const MOVMENT = { //cleanup and value return
  N: (snake) => snake.y--,
  S: (snake) => snake.y++,
  E: (snake) => snake.x++,
  W: (snake) => snake.x--,
};

export const changeheading = {
  N: { W: "N", A: "W", S: "N", D: "E" },
  E: { W: "N", A: "E", S: "S", D: "E" },
  W: { W: "N", A: "W", S: "S", D: "W" },
  S: { W: "S", A: "W", S: "S", D: "E" },
};

const drawBody = ({ width, height, pixels }, { bodyParts }) => {
  bodyParts
    .toReversed()
    .forEach(({ x, y, icon }) => {
      if (isInsideGrid({ width, height }, { x, y })) pixels[y][x] = icon;
    });
};

const drawFood = ({ pixels }, { x, y, icon }) => {
  console.log("inside draw food");

  console.log(y, x, icon);
  pixels[y][x] = icon;
};

const updateScreen = (screen, snake) => {
  drawFood(screen, snake.food);
  drawBody(screen, snake);
  if (isInsideGrid(screen, snake)) {
    screen.pixels[snake.y][snake.x] = snake.icon;
  }
};

const move = (snake) => MOVMENT[snake.heading](snake);

const updateBodyCoordinates = ({ bodyParts, x, y }) => {
  for (let i = bodyParts.length - 1; i > 0; i--) {
    const curr = bodyParts[i];
    const prev = bodyParts[i - 1];
    [curr.x, curr.y] = [prev.x, prev.y];
  }

  // bodyParts.toReversed().reduce((prev, curr, i) => {
  //   [curr.x, curr.y] = [prev.x, prev.y];
  //   return bodyParts[i];
  // });

  const neck = bodyParts[0];
  [neck.x, neck.y] = [x, y];
};

const updateSnake = (snake, input) => {
  if (input === "p") {
    snake.isPause = !snake.isPause;
    return;
  }

  if (VALID_KEYSTROKES.includes(input)) {
    snake.heading = changeheading[snake.heading][input.toUpperCase()];
  }

  if (!snake.isPause) {
    updateBodyCoordinates(snake);
    move(snake);
  }
};

const generateRandomCoordinates = (height, width) => {
  const foodX = Math.floor(Math.random() * height);
  const foodY = Math.floor(Math.random() * width);

  return [foodX, foodY];
};

// const generateFoodCoordinate = (snake, height, width) => {
//   let isUniquePair = false;

//   while (!isUniquePair) {
//     const [x, y] = generateRandomCoordinates(height, width);
//     isUniquePair = snake
//       .bodyParts
//       .every((part) => (part.x !== x) && (part.y !== y));
//     snake.food.x = x;
//     snake.food.y = y;
//   }
// };

const generateFoodCoordinate = (snake, height, width) => {
  let isUniqueCoordinates = false;
  let x = 0;
  let y = 0;

  while (!isUniqueCoordinates) {
    [x, y] = generateRandomCoordinates(height, width);
    isUniqueCoordinates = snake.bodyParts.every((part) => {
      return (part.x !== x) && (part.y !== y);
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
    const tail = { ...snake.bodyParts[0] };
    snake.bodyParts.push(tail);
  }
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
  updateSnake(snake, INPUT_BUFF);
  performIfFoodEaten(snake, h, w);
  updateScreen(screen, snake);
  performIfSnakeOnBoundary(screen, snake);
  displayScreen(screen, snake);
  INPUT_BUFF = "";
  await delay(t);
};

const setWidthHeight = (h, w) => {
  if (h && w) {
    HEIGHT = h;
    WIDTH = w;
  }
};

export const startGame = async (snakes, h, w, time = 300, s = 2) => {
  const snake = snakes[0];
  createSnakeTail(snake, s);
  readInput(snake);
  setWidthHeight(h, w);
  const SCREEN = createScreen(HEIGHT, WIDTH);
  while (true) {
    const args = { snake, screen: SCREEN, h, w, t: time };
    await performAction(args);
    if (snake.isDead) {
      Deno.exit(0);
    }
  }
};

await startGame(SNAKES, ...Deno.args);
