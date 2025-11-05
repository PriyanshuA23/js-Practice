let numberOfIteration = 0;

function sort(data) {
  let sortedArray = data.slice();

  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = i + 1; j < sortedArray.length; j++) {
      numberOfIteration++;
      
      if (sortedArray[i] > sortedArray[j]) {
        const temp = sortedArray[i];

        sortedArray[i] = sortedArray[j];
        sortedArray[j] = temp;
      }
    }
  }

  return sortedArray;
}

function generateRandomValue(lowerValue, upperValue) {
  return lowerValue + Math.random() * upperValue - lowerValue;
}

function generateDataOf(size) {
  let data = [];

  for (let index = 0; index < size; index++) {
    const randomValue = generateRandomValue(0, size);

    data.push(randomValue);
  }

  return data;
}

function benchmark(numberOfElement) {
  const data = generateDataOf(numberOfElement);
  sort(data);

  console.log(`${numberOfElement} | ${numberOfIteration}`);
}

benchmark(10);
