// import keypress from 'keypress';
import readline from 'readline';
import chalk from 'chalk';
import { encryptData } from './crypt.mjs';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  historySize: 1_000,
  prompt: '',
});

const validateNickname = (name = '') => {
  const result = {
    isValid: false,
    error: null,
    nickname: null,
  };

  const username = name.replace(/\s+/g, '');

  if (username.length < 5 || username.length > 20) {
    result.error = chalk.bold.red(
      `Entered name: "${username}". \nNickname should be at least 5 chars long and maximum of 20 chars long. Re-enter again.`
    );
    return result;
  }

  result.isValid = true;
  result.nickname = username;
  return result;
};

export const askForUsername = async () =>
  new Promise((resolve) => {
    rl.question('Enter your nickname: ', async (username) => {
      const { error, isValid, nickname } = validateNickname(username);

      if (!isValid) {
        console.log(error);
        const result = await askForUsername();
        resolve(result);
      } else {
        rl.prompt();
        resolve(nickname);
      }
    });
  });

function calculateOccupiedLines(input) {
  const consoleWidth = process.stdout.columns;
  const numLines = Math.ceil(input.length / consoleWidth);
  return numLines;
}

function clearLines(numLines) {
  for (let i = 0; i < numLines; i++) {
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
  }
}

export async function setupConsoleInteraction(socket) {
  rl.on('line', async (input) => {
    input = input.trim();

    if (!input.length) return;
    if (input === '/bye') process.exit();

    const occupiedLines = calculateOccupiedLines(input);
    clearLines(occupiedLines);

    const message = await encryptData(input);
    socket.emit('message', message);
  });

  rl.on('close', () => {
    console.log('Console interaction closed.');
  });
}
