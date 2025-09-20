const testCase = " Z LZ";

const lion = "L";
const zebra = "Z";

let animalFound = "No Animal";

if((testCase[0] === lion) || (testCase[0] === zebra)) {
    animalFound = (testCase[0] === lion) ? "L" : "Z";
}

console.log(animalFound,"is found");

animalFound = "No Animal";
if(testCase[1] === lion || testCase[1] === zebra) {
    animalFound = testCase[1] === lion ? "L" : "Z";
}

console.log(animalFound,"is found");

animalFound = "No Animal";
if(testCase[2] === lion || testCase[2] === zebra) {
    animalFound = testCase[2] === lion ? "L" : "Z";
}

console.log(animalFound,"is found");

animalFound = "No Animal";
if(testCase[3] === lion || testCase[3] === zebra) {
    animalFound = testCase[3] === lion ? "L" : "Z";
}

console.log(animalFound,"is found");

animalFound = "No Animal";
if(testCase[4] === lion || testCase[4] === zebra) {
    animalFound = testCase[4] === lion ? "L" : "Z";
}

console.log(animalFound,"is found");
