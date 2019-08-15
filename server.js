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
// server.use(lockOut);
server.use(timeBlock);

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

function lockOut(req, res, next) {
  res.status(403).json({ message: "API Lockout" });
  next();
}

// custom piece of middleware that blocks all requests when time is %3

function timeBlock(req, res, next) {
  const d = new Date();
  const time = d.getTime();

  if (time % 3 === 0) {
    res.status(403).json({ message: "ApI blocked" });
    next();
  } else {
    next();
  }
}

module.exports = server;
