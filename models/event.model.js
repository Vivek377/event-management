const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  sessions: [{ type: mongoose.Schema.ObjectId, ref: "Session" }],
});

const EventModel = mongoose.model("Event", EventSchema);

module.exports = EventModel;
