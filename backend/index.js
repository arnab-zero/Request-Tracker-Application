// const express = require("express");
// const mysql = require("mysql2/promise");
import express from "express";
import mysql from "mysql2/promise";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(express.json());

// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.get("/", async (req, res) => {
  try {
    const [users] = await connection.query("SELECT * FROM USER");

    console.log("Request received for fetching users: ", users); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available  

    res.json({
      message: "Users fetched successfully!",
      users: users,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/sign-up", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // database operations

  console.log(
    `Request received with name: ${name}, email: ${email}, password: ${password}`,
  );

  res.json({
    message: "Sign-up request received!",
    name: name,
    email: email,
    // password: password,
    // confirmPassword: confirmPassword,
  });
});

app.post("/sign-in", (req, res) => {
  const { email, password } = req.body;

  // database operations

  console.log(
    `Request received: /sign-in; name: ${email} password: ${password}`,
  );

  res.json({
    message: "You have signed in successfully!",
    token: "Token",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
