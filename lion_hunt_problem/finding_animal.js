const testCase = "Z LZ";

const lion = "L";
const zebra = "Z";

let animalFound = "";

for (let iterator = 0; iterator < testCase.length; iterator++) {

    animalFound = "No Animal";
    if ((testCase[iterator] === lion) || (testCase[iterator] === zebra)) {
        animalFound = (testCase[iterator] === lion) ? "L" : "Z";
    }

    console.log(animalFound, "is found");
}

