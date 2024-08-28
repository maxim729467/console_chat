import crypto from 'crypto';
import env from './env.mjs'; // export own vars from src/config/env.mjs

export const AUTH_CONN_KEY = env.AUTH_CONN_KEY;

export const SECRET_KEY = crypto
  .createHash('sha256')
  .update(env.CIPHER_KEY)
  .digest('hex');

export const DEFAULT_SERVER_PORT = 23223;
export const DEFAULT_SERVER_HOST = env.SERVER_HOST || '127.0.0.1';

export const MODES = {
  CLIENT: 'client',
  SERVER: 'server',
};
