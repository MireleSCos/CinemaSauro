const express = require("express");
const cors = require("cors");

const movie = require("./routes/movie");
const room = require("./routes/room");
const ticket = require("./routes/ticket");
const item = require("./routes/item");
const offer = require("./routes/offer");
const session = require("./routes/session");

const app = express();
const port = process.env.port | 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/filme", movie);
app.use("/room", room);
app.use("/ticket", ticket);
app.use("/item", item);
app.use("/offer", offer);
app.use("/sessao", session);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
