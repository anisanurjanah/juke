const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();

const router = jsonServer.router(
  path.join(__dirname, "employee.json")
);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/employees", router);

server.listen(8080, () => {
  console.log("JSON Server running at http://localhost:8080/employees");
});
