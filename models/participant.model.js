const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const ParticipantModel = mongoose.model("Participant", ParticipantSchema);

module.exports = ParticipantModel;
