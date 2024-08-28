import io from 'socket.io-client';
import chalk from 'chalk';

import { handleSocket } from './services/socketHandler/client.mjs';

import {
  setupConsoleInteraction,
  askForUsername,
} from './services/console.mjs';

import {
  AUTH_CONN_KEY,
  DEFAULT_SERVER_HOST,
  DEFAULT_SERVER_PORT,
} from './config/constants.mjs';

const runClient = async (
  host = DEFAULT_SERVER_HOST,
  port = DEFAULT_SERVER_PORT
) => {
  console.log(chalk.bold.blue('Welcome to CCHAT'));

  const username = await askForUsername();

  const opts = {
    query: { username },
    auth: { token: AUTH_CONN_KEY },
  };

  const socketClient = io(`http://${host}:${port}`, opts);

  handleSocket(socketClient, username);
  setupConsoleInteraction(socketClient);
};

export default runClient;
