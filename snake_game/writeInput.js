const writeInput = (input) => {
  Deno.writeTextFileSync("./src/input.txt", input);
};

while (true) {
  const input = prompt("//");
  writeInput(input);
}
