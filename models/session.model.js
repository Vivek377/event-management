const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.ObjectId, ref: "Paricipant" }],
  speaker: { type: mongoose.Schema.ObjectId, ref: "Speaker" },
  event: { type: mongoose.Schema.ObjectId, ref: "Event" },
});

const SessionModel = mongoose.model("Session", SessionSchema);

module.exports = SessionModel;
