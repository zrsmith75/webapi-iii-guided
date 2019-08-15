const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");
const logger = require("morgan");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();
const bodyParser = express.json();

// Global middleware

// built in middleware
server.use(bodyParser);

// third part middleware
server.use(helmet());
// other morgan types 'tiny' 'combined'
// server.use(logger("dev"));
server.use(methodLogger);
server.use(addName);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

// change

// Create custom middleware
function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

function addName(req, res, next) {
  req.name = "Bubba";
  next();
}

module.exports = server;
