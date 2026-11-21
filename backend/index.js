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

app.post("/sign-up", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // database operations
  const sql = `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`;
  const [result] = await connection.execute(
    // `INSERT INTO user (name, email, password) VALUES (?, ?, ?)`,
    sql,
    [name, email, password],
  );

  console.log(
    `Request received with name: ${name}, email: ${email}; Result: ${result}`,
  );

  res.json({
    message: result,
    name: name,
    email: email,
    // password: password,
    // confirmPassword: confirmPassword,
  });
});

app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  // database operations
  const sql = `SELECT name, email from USER WHERE email=? and password=?`;
  const [result] = await connection.execute(
    // `SELECT name, email from USER WHERE email=? and password=?`
    sql,
    [email, password],
  );

  console.log(`Request received: /sign-in; email: ${email}; Result: ${result}`);

  res.json({
    message: result,
    token: "Token",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
