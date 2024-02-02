const express = require("express");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

// setting up your port
const PORT = 8080;
const app = express();

// set up db
const sequelize = new Sequelize("testdb", "test-user", "password", {
  host: "localhost",
  dialect: "postgres",
});

// test db
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established succesfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.send("Hello World");
});

// listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
