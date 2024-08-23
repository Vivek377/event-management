const express = require("express");
const {
  createSession,
  getSessions,
  addSpeakertoSession,
  registerParticipant,
} = require("../controller/session.controller");

const sessionRoute = express.Router();

sessionRoute.post("/create", createSession);
sessionRoute.post("/add_speaker/:id", addSpeakertoSession);
sessionRoute.post("/add_participant/:id", registerParticipant);
sessionRoute.get("/", getSessions);

module.exports = sessionRoute;
