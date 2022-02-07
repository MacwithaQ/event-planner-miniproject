const express = require("express");
const { create } = require("./database/models/Event");
const Event = require("./database/models/Event");
const connectDB = require("./database/database");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(400).json({ msg: "Internal server error" });
  }
});
app.post("/events", async (req, res) => {
  try {
    const event = req.body;
    const createdEvent = await Event.create(event);
    res.status(201).json({ msg: "Event is created!", payload: createdEvent });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is listening", process.env.PORT);
});

connectDB();
