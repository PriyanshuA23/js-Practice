function meanOf(data) {
  let sumOfValues = 0;
  
  for (let index = 0; index < data.length; index++) {
    sumOfValues += data[index];
  }

  const mean = sumOfValues / data.length;

  return Math.floor(mean);
}

function standardDeviationOf(data) {
  const meanOfData = meanOf(data);
  let sumOfDelta = 0;

  for (let index = 0; index < data.length; index++) {
    const deltaValue = meanOfData - data[index];
    const squareOfValue = deltaValue * deltaValue;

    sumOfDelta += squareOfValue;
  }

  const variance = sumOfDelta / data.length;
  
  return Math.sqrt(variance);
}

const stdDeviation = standardDeviationOf([10, 12, 23, 23, 16, 23, 21, 16]);

console.log(stdDeviation);
