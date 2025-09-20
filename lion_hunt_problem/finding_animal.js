const testCase1 = " L Z LZ";

const lion = "L";
const zebra = "Z";

let currentShortestSpace = 0;
let previouShortestSpace = 0;
let currentAnimalFound = "";
let previousAnimalFound = "No Animal";

for (let iterator = 0; iterator < testCase1.length; iterator++) {

    currentAnimalFound = "No Animal";

    if ((testCase1[iterator] === lion) || (testCase1[iterator] === zebra)) {
        currentAnimalFound = (testCase1[iterator] === lion) ? "L" : "Z";

        console.log("previous Animal:",previousAnimalFound,"          current Animal:",currentAnimalFound);
       
        previousAnimalFound = currentAnimalFound;
    }

}

