import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const defaultValues = {
  "red": 12,
  "green": 13,
  "blue": 14,
}

let gameSum = 0;

async function processLineByLine() {

  let gamesPossible = 0;

  const fileStream = createReadStream('2_day/input.txt');

  const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    calculatingResult(line);
  }

  return gamesPossible;
}

function calculatingResult(line) {

  let result = true;

  //ID allocation
  let game = line.slice(0, line.indexOf(':'));
  let ID = game.slice(5);

  line = line.slice(line.indexOf(':')+2, line.length)

  //allocation of attempts and colors and its' values
  let attempts = line.split('; ');
  let temp = attempts.map(attempt => attempt.split(', '));

  temp.forEach(subArr => {
    subArr.forEach(color => {
      let cubes = color.split(' ');
      //value check
      if(+cubes[0] > defaultValues[cubes[1]]) {
         result = false;
      }

    })
  })
  
  if (result) {
    gameSum += +ID;
  }
};

await processLineByLine();

console.log(gameSum);
