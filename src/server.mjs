import os from "os";
import config from "./config.mjs";
import { Server } from "proxy-chain";

export const startProxy = () => {
  const server = new Server({
    authRealm: "justsml-easy-proxy",
    port: config.port,
    verbose: config.verbose,
    prepareRequestFunction: ({ username, password }) => ({
      // Use basic auth to verify user credentials:
      requestAuthentication:
        username !== config.username || password !== config.password,
      failMsg:
        "[easy-proxy] Bad username or password, please try again or verify configuration.",
    }),
  });

  server
    .listen(() => {
      const saferPassword =
        config.env === "development"
          ? config.password
          : Array(config.password?.length || 0).fill("*");
      let host = server.server.address().address;
      if (host === "::" || host.startsWith('127.0.0')) {
        host = os.hostname() ?? process.env.HOSTNAME ?? "localhost";
      }

      const proxyUri = `http://${config.username}:${saferPassword}@${host
        }:${server.port}`;

      console.log(`Proxy server running at:\n${proxyUri}\n`);
    })

  return server
    .on("connectionClosed", ({ connectionId, stats }) => {
      console.log(`Connection ${connectionId} closed`);
      console.dir(stats);
    })
    .on("requestFailed", ({ request, error }) => {
      console.log(`Request ${request.url} failed`);
      console.error(error);
    });

};
