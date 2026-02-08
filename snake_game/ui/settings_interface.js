import { checkbox, select, Separator } from "@inquirer/prompts";

const chooseOptions = async () => {
  console.clear();
  return await select({
    message: "\n🐍 OPTION TO CONFIG. 🐍\n",
    choices: [
      {
        name: "BOUNDARY",
        value: "boundary",
        description: "configure If boundary needed or not",
      },
      new Separator(),
      {
        name: "SPEED",
        value: "speed",
        description: "configure the speed according to you",
      },
      new Separator(),
      {
        name: "BACK",
        value: "back",
        description: "Go Back to previous page",
      },
    ],
  });
};

const setBoundary = async (snake) => {
  const userInput = await checkbox({
    message: "\nChoose Boundary Option\n",
    choices: [
      {
        name: "With Boundary",
        value: "yes",
        description: "If snake touch boundary it will die.",
      },
      new Separator(),
      {
        name: "No Boundary",
        value: "no",
        description: "Snake can move through boundary.",
      },
    ],
  });

  if (userInput === "yes") {
    snake.isBounded = true;
  }
  snake.isBounded = false;
};

const setSpeed = async (snake) => {
  const options = {
    "l": 500,
    "m": 250,
    "h": 100,
  };
  const userInput = await checkbox({
    message: "\nChoose Boundary Option\n",
    choices: [
      {
        name: "LOW",
        value: "l",
        description: "Speed of the snake initially will be slow",
      },
      new Separator(),
      {
        name: "MEDIUM",
        value: "m",
        description: "Speed of snake will be at medium initially",
      },
      new Separator(),
      {
        name: "HIGH",
        value: "h",
        description: "Speed of the snake will be high from starting",
      },
    ],
  });

  snake.delayTime = options[userInput];
};

const OPERATIONS = {
  "boundary": setBoundary,
  "speed": setSpeed,
};

export const configureOptions = async (snake) => {
  while (true) {
    const input = await chooseOptions();
    if (input === "back") {
      return;
    }
    await OPERATIONS[input](snake);
  }
};
