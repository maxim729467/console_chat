import chalk from 'chalk';
import readline from 'readline';
import { decryptData } from '../crypt.mjs';
import { rl } from '../console.mjs';

const TYPES = {
  MESSAGE: 'MESSAGE',
  NOTIFICATION: 'NOTIFICATION',
  ERROR: 'ERROR',
};

const MESSAGES = {
  [TYPES.MESSAGE]: (msg, color, user) =>
    console.log('\n' + `${chalk.bold[color](user) + ':'} ${msg}` + '\n'),
  [TYPES.NOTIFICATION]: (msg, color) =>
    console.log('\n' + chalk.bold[color](msg) + '\n'),
  [TYPES.ERROR]: (msg) => console.log('\n' + chalk.bold.red(msg) + '\n'),
};

const log = (
  type = TYPES.MESSAGE,
  message = '',
  color = 'white',
  user = null
) => MESSAGES[type](message, color, user);

export async function handleSocket(socketClient, nickname) {
  socketClient.on('list-users', async (encrUsers) => {
    const users = await decryptData(encrUsers);

    log(
      TYPES.NOTIFICATION,
      `=================\nACTIVE USERS: ${users}\n=================`,
      'grey'
    );
  });

  socketClient.on('user-connected', async (usr) => {
    const username = await decryptData(usr);
    readline.clearLine(process.stdout, 0);
    log(TYPES.NOTIFICATION, `User "${username}" joined chat`, 'green');
    rl.prompt(true);
    readline.moveCursor(process.stdout);
  });

  socketClient.on('user-disconnected', async (usr) => {
    const username = await decryptData(usr);
    readline.clearLine(process.stdout, 0);
    log(TYPES.NOTIFICATION, `User "${username}" left chat`, 'red');
    rl.prompt(true);
    readline.moveCursor(process.stdout);
  });

  socketClient.on('message', async (usr, msg) => {
    const username = await decryptData(usr);
    const message = await decryptData(msg);
    const color = nickname === username ? 'yellowBright' : 'cyanBright';

    readline.clearLine(process.stdout, 0);
    log(TYPES.MESSAGE, `${message}`, color, username);
    rl.prompt(true);
    readline.moveCursor(process.stdout);
  });

  socketClient.on('connect', () => {
    readline.clearLine(process.stdout, 0);
    log(TYPES.NOTIFICATION, 'Connected to server. Session started', 'blue');
    rl.prompt(true);
    readline.moveCursor(process.stdout);
  });

  socketClient.on('disconnect', (reason) => {
    readline.clearLine(process.stdout, 0);
    log(TYPES.ERROR, `Disconnected from server ::: REASON => ', ${reason}`);
    rl.prompt(true);
    readline.moveCursor(process.stdout);
  });
}
