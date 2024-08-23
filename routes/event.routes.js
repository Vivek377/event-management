const express = require("express");
const {
  createEvent,
  registerParticipant,
  updateEvent,
  deleteEvent,
  generatePDFEvent,
  getEvents,
  addSessiontoEvent,
} = require("../controller/event.controller");

const eventRoute = express.Router();

eventRoute.post("/create", createEvent);
eventRoute.post("/add_session/:id", addSessiontoEvent)
eventRoute.patch("/update/:id", updateEvent);
eventRoute.delete("/delete/:id", deleteEvent);
eventRoute.get("/generate_pdf/:id", generatePDFEvent);
eventRoute.get("/", getEvents);

module.exports = eventRoute;
