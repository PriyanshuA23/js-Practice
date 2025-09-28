function isVowel(character) {
 const vowel = character === 'a'
    || character === 'e'
    || character === 'i'
    || character === 'o'
    || character === 'u';
  
  if (vowel) {
    return true;
  }

  return false;
}

function shortestDistance(string) {
  let minimumDistance = string.length;
  let currentDistance = 0;
  let previousIndex = -1;

  for (let index = 0; index < string.length; index++) {
    if (isVowel(string[index])) {
      if (previousIndex !== -1) {
        currentDistance = index - previousIndex;

        if (currentDistance < minimumDistance) {
          minimumDistance = currentDistance;
        }
      }
      
      previousIndex = index;
      
    }
  }

  return minimumDistance;
}

function composeMessage(actualResult, expectedResult, isResultsEqual) {
  const yesNoSymbol = isResultsEqual ? "✅" : "❌";
  const expectedOutput = "Expected output is " + expectedResult;
  const actualOutput = "and actual output is " + actualResult;
  const finalOutput = yesNoSymbol + " | "
  + expectedOutput + " | " + actualOutput;

  return finalOutput;
}

function testShortestDistanceVowel(string, expected) {
  const actualResult = shortestDistance(string);
  const isResultsEqual = actualResult === expected;
  const finalDraft = composeMessage(actualResult, expected, isResultsEqual);

  console.log(finalDraft);
  
}

function runAllTestCases() {
  testShortestDistanceVowel("hello", 3);
}

runAllTestCases();
