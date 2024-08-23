const SpeakerModel = require("../models/speaker.model");

const createSpeaker = async (req, res) => {
  try {
    const speaker = new SpeakerModel(req.body);
    await speaker.save();
    res.status(200).send({ msg: "Speaker Added" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
};

const getSpeakers = async (req, res) => {
  try {
    const speakers = await SpeakerModel.find({});
    res.status(200).send(speakers);
  } catch (e) {
    console.log(e);
    res.status(400).send({ msg: e.message });
  }
};

module.exports = { createSpeaker, getSpeakers };
