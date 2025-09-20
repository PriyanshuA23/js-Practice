const calculateFactorialOf = 6;
let numberToOperate = calculateFactorialOf;
let resultOfFactorial = 1;

for (; numberToOperate > 1; numberToOperate--) {
    resultOfFactorial = resultOfFactorial * numberToOperate;
}

console.log("factorial of", calculateFactorialOf, "is", resultOfFactorial);

