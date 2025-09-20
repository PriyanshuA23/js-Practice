const testCase1 = "LZ";
const testCase2 = "Z L";
const testCase3 = "L     Z";
const testCase4 = "L     L";
const testCase5 = "Z   Z   Z";
const testCase6 = "L  ZL Z";

const testCaseToUse = testCase1;

const lion = "L";
const zebra = "Z";

let previouShortestSpace = 1000;
let currentAnimalFound = "";
let previousAnimalFound = "No Animal";
let spaceCounter = 0;

for (let iterator = 0; iterator < testCaseToUse.length; iterator++) {

    currentAnimalFound = "No Animal";

    if ((testCaseToUse[iterator] === lion) || (testCaseToUse[iterator] === zebra)) {
        currentAnimalFound = (testCaseToUse[iterator] === lion) ? "L" : "Z";

        if(previousAnimalFound !== currentAnimalFound) {
            if(previouShortestSpace > spaceCounter){
                previouShortestSpace = spaceCounter;
                
            }
        }
       
        previousAnimalFound = currentAnimalFound;
        spaceCounter = 0;
    }

    if(currentAnimalFound === "No Animal") {
        spaceCounter++;
    }

}

console.log("Input:",testCaseToUse,"        Output:",previouShortestSpace);
