import http from "http";
import app from "./app";
import config from "./config/config";

const server = http.createServer(app);

const { port } = config.server;

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
