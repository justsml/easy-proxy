FROM node:18

WORKDIR /app
COPY . /app

RUN npm install

ENTRYPOINT [ "node", "src/index.mjs" ]
