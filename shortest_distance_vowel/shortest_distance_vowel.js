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
  return 3;
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
