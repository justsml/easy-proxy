import config from "./config.mjs";
import { Server } from "proxy-chain";
import { getHostName, showUsageInfo } from "./common.mjs";

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
      let host = getHostName(server);

      const proxyUri = `http://${config.username}:${saferPassword}@${host
        }:${server.port}`;

      console.log(`------------------------------------------------------------\n# Proxy Running!\n\n${proxyUri}\n`);
      showUsageInfo(proxyUri);
    })

  return server
    .on("connectionClosed", ({ connectionId, stats }) => {
      console.log(`Connection ${connectionId} closed`);
      // console.dir(stats);
    })
    .on("requestFailed", ({ request, error }) => {
      console.log(`Request ${request.url} failed`);
      console.error(error);
    });
};

