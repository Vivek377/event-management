const express = require("express");
const {
  createSession,
  getSessions,
  addSpeakertoSession,
} = require("../controller/session.controller");

const sessionRoute = express.Router();

sessionRoute.post("/create", createSession);
sessionRoute.post("/add_speaker/:id", addSpeakertoSession);
sessionRoute.get("/", getSessions);

module.exports = sessionRoute;
