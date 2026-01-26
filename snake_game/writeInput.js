const writeInput = (input) => {
  Deno.writeTextFileSync("input.txt", input);
};

while (true) {
  const input = prompt("//");
  writeInput(input);
}
