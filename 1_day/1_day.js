import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';


async function processLineByLine() {

  let calibrationValue = 0;
  let flag = 1;
  const fileStream = createReadStream('1_day/input.txt');

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    calibrationValue += calculatingResult(line);
  }

  return calibrationValue;
}

console.log(await processLineByLine()); 

function calculatingResult(line) {

  let resultingValue = '';
  let arr = Array.from(line);

  let firstValue = arr.find(elem => !isNaN(elem));
  arr.splice(arr.indexOf(firstValue), 1);
  arr.reverse();
  let secondValue = arr.find(elem => !isNaN(elem));

  if(!isNaN(firstValue)) {
    resultingValue += firstValue;
  } 

  if(!isNaN(secondValue)) {
    resultingValue += secondValue;
  } 

  if(resultingValue.length === 1) {
    resultingValue += resultingValue;
  };
  
  return +resultingValue;
};