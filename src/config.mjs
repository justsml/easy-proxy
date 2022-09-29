import dotenv from 'dotenv';
dotenv.config();

import AutoConfig from '@elite-libs/auto-config';

const {autoConfig} = AutoConfig;

export default autoConfig({
  env: {
    args: ['--env', 'NODE_ENV'],
    default: 'development',
  },
  username: {
    args: ['--username', 'PROXY_USERNAME'],
    help: 'Username to access this proxy. Proxy URI format: http://username:pasword@host:port',
    required: true,
  },
  password: {
    args: ['--password', 'PROXY_PASSWORD'],
    help: 'Password to access this proxy. Proxy URI format: http://username:pasword@host:port',
    required: true,
  },
  port: {
    args: ['PORT'],
    default: 5050,
    type: 'number',
    help: 'Port where the server will listen.',
    required: true,
  },
});
