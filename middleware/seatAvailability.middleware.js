const SessionModel = require("../models/session.model");

const seatAvailability = async (req, res, next) => {
  const { id } = req.params;

  const session = await SessionModel.findById(id);

  if (!session) {
    return res.status(404).send({ err: "Session Not Found" });
  }

  if (session.participants.length >= 10) {
    return res.status(400).send({ err: "Session seats full" });
  }

  next();
};

module.exports = seatAvailability;
