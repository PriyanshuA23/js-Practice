const dbg = (x) => {
  console.log(x);
};

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

const updateScreen = (screen, snakes) => {
  for (const snake of snakes) {
    drawFood(screen, snake.food);
    drawTails(screen, snake);
    if (isInsideGrid(screen, snake)) {
      screen[snake.y][snake.x] = snake.icon;
    }
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

const updateSnake = (snakes, input) => {
  for (const snake of snakes) {
    if (input === "L" || input === "R") {
      snake.direction = changeDirection[snake.direction][input];
    }

    updateTailCoordinates(snake);
    move(snake);
  }
};

const snakes = [
  {
    x: 5,
    y: 5,
    direction: "W",
    icon: "🐍",
    tails: [
      {
        x: 5,
        y: 5,
        icon: "🟧",
      },
    ],
    food: {
      x: 1,
      y: 1,
      icon: "🍔",
    },
  },
];

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

const startGame = (snakes, height = 10, width = 10, size = 2) => {
  const screen = createScreen(height, width);

  createSnakeTail(snakes[0], size);
  updateScreen(screen, snakes);
  displayScreen(screen);

  while (isInsideGrid(screen, snakes[0])) {
    const input = prompt("enter").toUpperCase();

    clearScreen(screen);
    updateSnake(snakes, input);

    if (isFoodEaten(snakes[0])) {
      generateFoodCoordinate(snakes[0], height, width);
      createSnakeTail(snakes[0], 1);
    }

    updateScreen(screen, snakes);
    displayScreen(screen, snakes);
  }

  console.log("YOU LOOSE");
};

startGame(snakes, ...Deno.args);
