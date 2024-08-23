const ParticipantModel = require("../models/participant.model");
const SessionModel = require("../models/session.model");
const SpeakerModel = require("../models/speaker.model");

const createSession = async (req, res) => {
  try {
    const session = new SessionModel(req.body);
    await session.save();
    res.status(200).send({ msg: "Session Saved" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await SessionModel.find({});
    res.status(200).send(sessions);
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const addSpeakertoSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { speakerId } = req.body;

    const session = await SessionModel.findById(id);

    if (!session) {
      return res.status(404).send({ err: "Session not found" });
    }

    const speaker = await SpeakerModel.findById(speakerId);

    if (!speaker) {
      return res.status(404).send({ err: "Speaker not found" });
    }

    session.speaker = speakerId;
    await session.save();

    res.status(200).send({ msg: "Speaker Saved" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const registerParticipant = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;

    const session = await SessionModel.findById(id);

    const participant = new ParticipantModel({ name, email });
    await participant.save();

    session.participants.push(participant._id);
    await session.save();

    res.status(200).send({ msg: "Participant registered successfully" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

module.exports = {
  createSession,
  getSessions,
  addSpeakertoSession,
  registerParticipant,
};
