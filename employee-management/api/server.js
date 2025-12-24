const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(
  path.join(process.cwd(), "src", "utils", "employee.json")
);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);

module.exports = server;
