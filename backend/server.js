const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();

// setting up your port
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res) => {
  res.send("Hello World");
});

// listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
