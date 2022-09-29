// credit: https://medium.com/@gchudnov/trapping-signals-in-docker-containers-7a57fdda7d86
export const handleShutdown = (server) => {
  const signals = {
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGTERM': 15
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
}

export const showUsageInfo = (proxyUri) => {
  console.log(`
------------------------------------------------------------
## Example Usage:

curl --include \\
  --head \\
  --show-error \\
  --proxytunnel \\
  --proxy "${proxyUri}" http://www.bing.com/

`);
}