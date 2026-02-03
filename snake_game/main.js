import { isInsideGrid } from "./utils/boundary_checker.js";
import {
  clearScreen,
  createScreen,
  displayScreen,
} from "./utils/screen_setup.js";
import { SNAKES } from "./snakeData.js";
const screen = createScreen(10, 10);
const MOVMENT = {
  N: (snake) => snake.y--,
  S: (snake) => snake.y++,
  E: (snake) => snake.x++,
  W: (snake) => snake.x--,
};

Deno.stdin.setRaw(true);
let INPUT = "m";

export const changeheading = {
  N: { W: "N", A: "W", S: "N", D: "E" },
  E: { W: "N", A: "E", S: "S", D: "E" },
  W: { W: "N", A: "W", S: "S", D: "W" },
  S: { W: "S", A: "W", S: "S", D: "E" },
};

const drawBody = (screen, { bodyParts }) => {
  bodyParts
    .toReversed()
    .forEach(({ x, y, icon }) => {
      if (isInsideGrid(screen, { x, y })) screen.pixels[y][x] = icon;
    });
};

const drawFood = (screen, { x, y, icon }) => screen.pixels[y][x] = icon;

const updateScreen = (screen, snake) => {
  drawFood(screen, snake.food);
  drawBody(screen, snake);
  if (isInsideGrid(screen, snake)) screen.pixels[snake.y][snake.x] = snake.icon;
};

const move = (snake) => MOVMENT[snake.heading](snake);

const updateTailCoordinates = (snake) => {
  for (let index = snake.bodyParts.length - 1; index > 0; index--) {
    [snake.bodyParts[index].x, snake.bodyParts[index].y] = [
      snake.bodyParts[index - 1].x,
      snake.bodyParts[index - 1].y,
    ];
  }
  [snake.bodyParts[0].x, snake.bodyParts[0].y] = [snake.x, snake.y];
};

const updateSnake = (snake, input) => {
  if (input === "p") snake.isPause = !snake.isPause;
  else {
    const inputs = ["w", "a", "s", "d"];
    if (inputs.includes(input)) {
      snake.heading = changeheading[snake.heading][input.toUpperCase()];
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
    isUniqueCoordinates = snake.bodyParts.every((tail) => {
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
    const tail = { ...snake.bodyParts[0] };
    snake.bodyParts.push(tail);
  }
};

export const readInput = async (snake) => {
  for await (const chunk of Deno.stdin.readable) {
    INPUT = new TextDecoder().decode(chunk).trim();
    if (snake.isDead) {
      return;
    }
    if (INPUT === "p") SNAKES[0].isPause;
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
  updateSnake(snake, INPUT);
  performIfFoodEaten(snake, h, w);
  updateScreen(screen, snake);
  performIfSnakeOnBoundary(screen, snake);
  displayScreen(screen, snake);
  INPUT = "";
  await delay(t);
};

export const startGame = async (snakes, h = 10, w = 10, time = 300, s = 2) => {
  const snake = snakes[0];
  createSnakeTail(snake, s);
  readInput(snake);

  while (true) {
    const args = { snake, screen, h, w, t: time };
    await performAction(args);
    if (snake.isDead) {
      Deno.exit(0);
    }
  }
};

await startGame(SNAKES, ...Deno.args);
