const express = require("express");
const { Sequelize } = require("sequelize");
require("dotenv").config();

// logger
const winston = require("winston");
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});
// setting up your port
const PORT = 8080;
const app = express();

/*
const sequelize = new Sequelize("testdb", "test-user", "password", {
  host: "localhost",
  dialect: "postgres",
});
*/

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  { host: "localhost", dialect: "postgres" }
);
// test db
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established successfully."))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
    process.exit(1); // Exit with a failure code
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  logger.log("error", "This is an error message");
  logger.log("warn", "This is a warning message");
  logger.log("info", "This is an info message");
  logger.log("verbose", "This is a verbose message");
  logger.log("debug", "This is a debug message");
  logger.log("silly", "This is a silly message");
  res.send("Hello World");
});

// listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
