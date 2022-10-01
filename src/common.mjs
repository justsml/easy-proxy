import chalk from "chalk";
import os from "os";

/**
 * This is for graceful shutdown in container & specialized hosting envs.
 * @copyright /credit: https://medium.com/@gchudnov/trapping-signals-in-docker-containers-7a57fdda7d86
 */
export const handleShutdown = (server) => {
  const signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
  };
  // Do any necessary shutdown logic for our application here
  const shutdown = (signal, value) => {
    console.log("shutdown!");
    server?.close(() => {
      console.log(`server stopped by ${signal} with value ${value}`);
      process.exit(128 + value);
    });
  };
  // Create a listener for each of the signals that we want to handle
  Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
      console.log(`process received a ${signal} signal`);
      shutdown(signal, signals[signal]);
    });
  });
};

export const showUsageInfo = (proxyUri) => {
  console.log(`
${chalk.bold.greenBright(`# `) + chalk.bgGreen.whiteBright(` Easy-Proxy Started! `) + ` ✨🚀

${chalk.magenta(`------------------ 👇 Client Proxy Config 👇 -----------------`)}

${chalk.greenBright(`##`)} ${chalk.bold(`Configure your HTTP client with the following URI:`)}

${chalk.blueBright(proxyUri)}`}


${chalk.yellow(`--------------------- 🔎 Test Commands 🔍 --------------------`)}

${chalk.greenBright(`##`) + 
chalk.bold(` Check Proxy Connectivity`)}

 ${chalk.whiteBright(`curl --head --proxytunnel --proxy "${proxyUri}" http://www.bing.com/`)}


${chalk.greenBright(`##`)} ${chalk.bold(`Determine Proxy's Visible IP Address`)}
This should always return the same IP regardless of the source network.

${chalk.whiteBright(`curl --proxytunnel --proxy "${proxyUri}" --silent http://checkip.amazonaws.com/`)}

${chalk.magentaBright(`>`)} ${chalk.italic.blue(`Note: `) + chalk.italic(`Uses AWS "Check My IP" service.`)}


${chalk.dim`To exit, press ` + chalk.bold`Ctrl+C` + chalk.dim` or send a ` + chalk.bold`SIGTERM` + chalk.dim` signal.`}
`);
};


/**
 * Best effort auto-detection of public IP w/o a required external HTTP call.
 *
 * @param {*} server
 * @returns
 */
export function getHostName(server) {
  let host = server?.server?.address().address;
  if (!host || host === "::" || host.startsWith("127.0.0")) {
    host = os.hostname() ?? "localhost";
  }
  return host;
}
