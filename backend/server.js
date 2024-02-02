const express = require("express");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

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
    // process.exit(1); // Exit with a failure code
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.send("Hello World");
});

// listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
