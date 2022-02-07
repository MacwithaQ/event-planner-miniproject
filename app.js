const express = require("express");
const { create } = require("./database/models/Event");
const Event = require("./database/models/Event");
const connectDB = require("./database/database");

const app = express();

const PORT = 8000;

app.get("/", (req, res) => {
  res.send("Hello");
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

app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});

connectDB();
