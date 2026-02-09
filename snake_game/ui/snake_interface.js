import { select, Separator } from "@inquirer/prompts";
import { startGame } from "../src/snake_game.js";
import { configureOptions } from "./settings_interface.js";

const extractUserInput = async () => {
  console.clear();
  return await select({
    message: "\n🐍 SNAKE GAME 🐍\n",
    choices: [
      {
        name: "START",
        value: "start",
        description: "start the game with default settings",
      },
      new Separator(),
      {
        name: "MODE",
        value: "mode",
        description: "choose mode like easy, medium and hard",
      },
      new Separator(),
      {
        name: "SETTINGS",
        value: "settings",
        description: "you can configure the snake game.",
      },
      new Separator(),
      {
        name: "EXIT",
        value: "exit",
        description: "Exit Game",
      },
    ],
  });
};

const OPERATIONS = {
  "start": startGame,
  "exit": () => {
    throw new Error("exit");
  },
  "settings": configureOptions,
};

export const userInterface = async (snake) => {
  while (true) {
    const input = await extractUserInput();
    await OPERATIONS[input](snake, 30, 30);
  }
};
