import { Command, Option } from 'commander';
import chalk from 'chalk';

import { MODES } from './config/constants.mjs';

import runClient from './client.mjs';
import runServer from './server.mjs';

const program = new Command();

program
  .name('cchat')
  .version('0.0.1')
  .description(
    'This is simple and secure chat.\
 All incoming/outgoing messages are encrypted\
 and available only during chat session. \nIf you are in client mode,\
 type "/bye" or press "CTRL+C" to stop the chat.'
  )

  .addOption(
    new Option('-m, --mode <string>', `Chat mode. Default is "${MODES.CLIENT}"`)
      .default(MODES.CLIENT)
      .choices([MODES.SERVER, MODES.CLIENT])
  )

  .addOption(
    new Option('-h, --host <string>', 'Server IP address. Example: "127.0.0.1"')
  )

  .addOption(
    new Option('-p, --port <number>', 'Server IP port. Example: 5000')
  );

const options = program.opts();
program.parse(process.argv);

if (options.mode === MODES.SERVER) runServer(options.port);
else if (options.mode === MODES.CLIENT) runClient(options.host, options.port);
else {
  console.log(chalk.bold.red('\nExiting CCHAT'));
  process.exit(1);
}

process.on('SIGINT', () => {
  console.log(chalk.bold.blue('\nExiting CCHAT'));
  process.exit();
});
