# @justsml/easy-proxy

<!-- [![CI Status](https://github.com/justsml/easy-proxy/workflows/test/badge.svg)](https://github.com/justsml/easy-proxy/actions) -->
[![NPM version](https://img.shields.io/npm/v/@justsml/easy-proxy.svg)](https://www.npmjs.com/package/@justsml/easy-proxy)
[![GitHub stars](https://img.shields.io/github/stars/justsml/easy-proxy.svg?style=social)](https://github.com/justsml/easy-proxy)

## Usage

```sh
npm install -g @justsml/easy-proxy
```

```sh
easy-proxy \
  --username test \
  --password test123 \
  --port 5050 \
  --proxyHost "$(curl --silent http://checkip.amazonaws.com)"
```

## Options

| Name                  | CLI & Env Args
|-----------------------|----------------|
| username              | `--username`, `PROXY_USERNAME`
| password              | `--password`, `PROXY_PASSWORD`
| port                  | `--port`, `PROXY_PORT`, `PORT` (default: `5050`)
| proxyHost             | `--proxy-host`, `PROXY_HOST`

Set the `PROXY_HOST` environment variable to an accessible DNS name (or IP Address) of the proxy server.

### Usage Tip

Configure via environment variables in a shell script, for example:

```sh
export PROXY_PORT=80
export PROXY_HOST=$(curl --silent http://checkip.amazonaws.com)
export PROXY_USERNAME=proxy-user
# Next, generate a password or change as needed.
export PROXY_PASSWORD=$(uuidgen | head -c 8 | sed "y/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/")
#   The password **will** be printed to the console in development, otherwise it'll be replaced with '*******'.

# Start the proxy server
easy-proxy
```

## Development

```sh
npm start -- --username test --password test123
```

You can define config via environment variables and/or CLI args:

```sh
PROXY_USERNAME=test PROXY_PASSWORD=test123 npm start
```

```sh
# Set values for current shell session
export PROXY_USERNAME=test
export PROXY_PASSWORD=test123

npm start -- --port 5050
```

## Client-side Testing

Start a proxy and grab the printed proxy URI. We'll need to use it to configure client access.

To test quickly with `curl`:

Set your `PROXY_URI` environment variable, then run:

```sh
# Example PROXY_URI:
#PROXY_URI=http://test:test123@localhost:5050

curl --include \
     --head \
     --show-error \
     --proxytunnel \
     --proxy "$PROXY_URI" http://www.bing.com/
```
