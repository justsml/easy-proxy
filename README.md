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
  --port 5050

# or
npm start -- --username test --password test123 --port 5050
```

## Options

| Name                  | CLI & Env Args
|-----------------------|----------------|
| username              | `--username`, `PROXY_USERNAME`
| password              | `--password`, `PROXY_PASSWORD`
| port                  | `--port`, `PORT` (default: `5050`)
| publicHost            | `--public-host`, `PUBLIC_HOST`

Set the `PUBLIC_HOST` environment variable to an accessible DNS name (or IP Address) of the proxy server.

For example, in AWS EC2, you can access the IP via an internal HTTP call:

```sh
curl http://checkip.amazonaws.com

# And to set it to the environment variable:
export PUBLIC_HOST=$(curl http://checkip.amazonaws.com)
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
