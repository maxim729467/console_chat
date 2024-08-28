import { encryptData } from '../crypt.mjs';
import { AUTH_CONN_KEY } from '../../config/constants.mjs';

export async function handleSockets(socket) {
  const token = socket.handshake?.auth?.token;

  if (token !== AUTH_CONN_KEY) {
    socket.disconnect();
    return;
  }

  const { username } = socket.handshake.query;
  const usr = await encryptData(username);
  global.socketServer.emit('user-connected', usr);
  const sockets = [...global.socketServer.of('/').sockets.values()];

  const users = sockets
    .map((socket) => socket.handshake.query.username)
    .join(', ');

  const encrUsers = await encryptData(users);
  socket.emit('list-users', encrUsers);

  socket.on('message', async (message) => {
    global.socketServer.emit('message', usr, message);
  });

  socket.on('disconnect', () => {
    global.socketServer.emit('user-disconnected', usr);
  });
}
