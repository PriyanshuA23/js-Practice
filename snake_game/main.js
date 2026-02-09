import { SNAKES } from "./src/snakeData.js";
import { userInterface } from "./ui/snake_interface.js";

const main = async () => {
  try {
    await userInterface(SNAKES[0]);
  } catch (e) {
    Deno.exit(0);
  }
};

await main();
