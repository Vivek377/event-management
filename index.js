const express = require("express");
const cors = require("cors");
const connection = require("./db");
const eventRoute = require("./routes/event.routes");
const sessionRoute = require("./routes/session.routes");
const speakerRoute = require("./routes/speaker.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/events", eventRoute);
app.use("/sessions", sessionRoute);
app.use("/speaker", speakerRoute);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log(`Server running on ${process.env.PORT}`);
  } catch (e) {
    console.log(e);
  }
});
