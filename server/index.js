// importing routes
import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users";

import Cors from "cors";

import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//passport Config

app.use("/api/v1", users);

// catch 405
app.use((req, res, next) => {
  const error = new Error("Method not allowed");
  error.status = 405;
  next(error);
});
//catch 500
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ status: error.status || 500, error: error.message });
  next();
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is Running on port ${PORT}`);
});

export default app;
