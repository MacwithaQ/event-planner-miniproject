const { create, findById } = require("../database/models/Event");
const Product = require("../database/models/Event");
const Event = require("../database/models/Event");

const getEventsList = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
  }
};

const getCreateEvent = async (req, res) => {
  try {
    const event = req.body;
    const createdEvent = await Event.create(event);
    res.status(201).json({ msg: "Event is created!", payload: createdEvent });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getDeleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findByIdAndDelete(eventId);
    if (foundEvent) {
      //   204 status for deletion
      res.status(204).end();
    } else {
      //  404 if it cant be found
      res.status(404).json({ msg: "event not found" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const foundEvent = await Event.findById(eventId);
    if (foundEvent) {
      res.json(foundEvent);
    } else {
      res.status(404).json({ msg: "Event not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const getUpdateEvent = async (req, res) => {
  const { eventId } = req.params;
  const eventupdate = req.body;
  try {
    const updatedEvent = await Product.findByIdAndUpdate(eventId, eventupdate, {
      new: true,
    });
    res
      .status(200)
      .json({ msg: "Updated successfully", payload: updatedEvent });
  } catch (error) {
    res.status(400).json({ msg: error.msg });
  }
};

const getFullyBookedEvents = async (req, res) => {
  try {
    let events = await Event.find();
    events = events.filter((event) => event.bookedSeats === event.numOfSeats);
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getCreateEvent,
  getEventsList,
  getDeleteEvent,
  getSingleEvent,
  getUpdateEvent,
  getFullyBookedEvents,
};
