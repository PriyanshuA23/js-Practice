const primeCandidate = 97;
let divident = 2;
let factor = false;

while(divident < primeCandidate) {
    if(primeCandidate % divident === 0) {
        factor = true;
    }
    divident++;
}

const output = factor ? "is composite" : "is Prime";

console.log(primeCandidate,output);
