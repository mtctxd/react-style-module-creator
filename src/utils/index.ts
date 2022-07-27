import * as readlineSync from 'readline-sync';

export const stdinShouldComplete = (text: string) => {
  let result: string = readlineSync.question(`${text}\n`);

  return result.toLowerCase() === 'y';
};
