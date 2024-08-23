const express = require("express");
const {
  createSpeaker,
  getSpeakers,
} = require("../controller/speaker.controller");

const speakerRoute = express.Router();

speakerRoute.post("/create", createSpeaker);
speakerRoute.get("/", getSpeakers);

module.exports = speakerRoute;
