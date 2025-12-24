import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";

const server = jsonServer.create();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = jsonServer.router(
  path.join(__dirname, "..", "..", "src", "utils", "employee.json")
);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/api", router);

export default server;
