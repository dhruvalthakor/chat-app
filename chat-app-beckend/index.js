const express = require("express");
const {  connection } = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userrouter = require("./routers/user.router");
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/user",userrouter)



app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  connection();
  console.log("server is started");
});
