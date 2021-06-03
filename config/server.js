/* eslint-disable no-console */
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/", (req, res, next) => {
  res.send("hello world");
});