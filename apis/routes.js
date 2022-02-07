const express = require("express");
const {
  getEventsList,
  getCreateEvent,
  getDeleteEvent,
  getSingleEvent,
  getUpdateEvent,
} = require("./controllers");

const eventsRouter = express.Router();

// FETCH EVENTSLIST
eventsRouter.get("/", getEventsList);
// FETCH SINGLE EVENT
eventsRouter.get("/:eventId", getSingleEvent);
// CREATE EVENT
eventsRouter.post("/", getCreateEvent);
// DELETE EVENT
eventsRouter.delete("/:eventId", getDeleteEvent);
// UPDATE EVENT
eventsRouter.put("/:eventId", getUpdateEvent);

module.exports = eventsRouter;
