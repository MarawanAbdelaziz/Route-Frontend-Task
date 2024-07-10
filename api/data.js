import jsonServer from "json-server";
import { createServer } from "http";

const server = jsonServer.create();
const router = jsonServer.router("/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

createServer(server).listen(3000, () => {
  console.log("JSON Server is running");
});
