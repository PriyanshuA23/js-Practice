const testCase = "Z LZ";

const lion = "L";
const zebra = "Z";

let animalFound = "No Animal";

if((testCase[0] === lion) || (testCase[0] === zebra)) {
    animalFound = (testCase[0] === lion) ? "L" : "Z";
}

console.log(animalFound,"is found");
