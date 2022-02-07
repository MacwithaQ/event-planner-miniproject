const express = require("express");
const { create } = require("./database/models/Event");
const Event = require("./database/models/Event");
const connectDB = require("./database/database");
const dotenv = require("dotenv");
const eventsRouter = require("./apis/routes");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/events", eventsRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is listening", process.env.PORT);
});

connectDB();
