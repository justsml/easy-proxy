#!/usr/bin/env node
import { handleShutdown } from "./common.mjs";
import { startProxy } from "./server.mjs";

const server = startProxy();

handleShutdown(server);
