const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const SpeakerModel = mongoose.model("Speaker", SpeakerSchema);

module.exports = SpeakerModel;
