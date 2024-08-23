const EventModel = require("../models/event.model");
const ParticipantModel = require("../models/participant.model");
const SessionModel = require("../models/session.model");
const PDFDocument = require("pdfkit");
const SpeakerModel = require("../models/speaker.model");

const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find({});
    res.status(200).send(events);
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

    if (!session) {
      return res.status(404).send({ err: "Session Not Found" });
    }

    if (session.participants.length >= 10) {
      return res.status(400).send({ err: "Session seats full" });
    }

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

const createEvent = async (req, res) => {
  try {
    const event = new EventModel(req.body);
    await event.save();
    res.status(200).send({ msg: "Event Added" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await EventModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).send({ msg: "Event Updated" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await EventModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "Event Deleted" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const addSessiontoEvent = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const { id } = req.params;

    const event = await EventModel.findById(id);
    event.sessions.push(sessionId);

    await event.save();

    res.status(200).send({ msg: "Session Added" });
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

const generatePDFEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await EventModel.findOne({ _id: id })
      .populate({
        path: "sessions",
        populate: [
          { path: "speaker", model: SpeakerModel },
          { path: "participants", model: ParticipantModel },
        ],
      })
      .exec();

    if (!event) {
      return res.status(404).send({ err: "Event not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `attachment: filename: "event ${event.name}.pdf"`
    );

    doc.pipe(res);

    doc.fontSize(16).text(`Event Name : ${event.name}`, { underline: true });

    doc
      .fontSize(12)
      .text(`Event Date : ${event.date.toDateString()}`, { underline: true });

    doc.fontSize(14).text("Sessions : ", { underline: true });

    event.sessions.forEach((session, index) => {
      doc
        .fontSize(12)
        .text(`Session ${index + 1} : ${session.name}`, { bold: true });

      doc.text(`Start Time : ${session.startTime.toLocaleTimeString()}`);
      doc.text(`End Time : ${session.endTime.toLocaleTimeString()}`);

      doc.text(`Speaker : ${session.speaker ? session.speaker.name : "NA"}`);

      doc.text("Participants :");

      session.participants.forEach((part, pIndex) => {
        doc.text(` ${pIndex + 1}. ${part.name} ${part.email}`);
      });
    });

    doc.end();
  } catch (e) {
    console.log(e);
    res.status(400).send({ err: e.message });
  }
};

module.exports = {
  registerParticipant,
  addSessiontoEvent,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  generatePDFEvent,
};
