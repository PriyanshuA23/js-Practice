function sort(data) {
  let sortedArray = data.slice();

  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = i + 1; j < sortedArray.length; j++) {
      if (sortedArray[i] > sortedArray[j]) {
        const temp = sortedArray[i];

        sortedArray[i] = sortedArray[j];
        sortedArray[j] = temp;
      }
    }
  }

  return sortedArray;
}

function medianOf(data) {
  const sortedData = sort(data);
  const indexOfMedian = Math.floor(sortedData.length / 2);

  if (sortedData.length % 2 === 0) {
    const previousIndex = indexOfMedian - 1;
    const meanOfMedians = (sortedData[indexOfMedian] + sortedData[previousIndex]) / 2;

    return meanOfMedians;
  }

  return sortedData[indexOfMedian];
}

const median = medianOf([0, 25, 25, 50]);

console.log(median);

