import dotenv from 'dotenv';
dotenv.config();

import AutoConfig from '@elite-libs/auto-config';
import { getHostName } from './common.mjs';

const {autoConfig} = AutoConfig;

export default autoConfig({
  env: {
    args: ['--env', 'NODE_ENV'],
    default: 'development',
  },
  proxyHost: {
    args: ['--proxy-host', 'PROXY_HOST'],
    help: 'The public host name for the proxy server.',
    default: getHostName(),
  },
  username: {
    args: ['--username', 'PROXY_USERNAME'],
    help: 'Username to access this proxy.',
    required: true,
  },
  password: {
    args: ['--password', 'PROXY_PASSWORD'],
    help: 'Password to access this proxy.',
    required: true,
  },
  port: {
    args: ['--port', 'PROXY_PORT', 'PORT'],
    default: 5050,
    type: 'number',
    help: 'Port where the server will listen.',
    required: true,
  },
});

