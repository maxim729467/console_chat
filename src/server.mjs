import http from 'http';
import { Server } from 'socket.io';
import { DEFAULT_SERVER_PORT } from './config/constants.mjs';
import { handleSockets } from './services/socketHandler/server.mjs';

const runServer = (port = DEFAULT_SERVER_PORT) => {
  const server = http.createServer();
  global.socketServer = new Server(server);
  global.socketServer.on('connection', handleSockets);

  server.listen(port, () => {
    console.log(`CCHAT LAUNCHED :${port}`);
  });
};

export default runServer;
