const express = require("express");
const cors = require("cors");

const movie = require("./routes/movie");
const room = require("./routes/room");
const ticket = require("./routes/ticket");
const item = require("./routes/item");
const session = require("./routes/session");
const purchase = require("./routes/purchase");
const client = require("./routes/client");

const app = express();
const port = process.env.port | 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/filme", movie);
app.use("/room", room);
app.use("/ticket", ticket);
app.use("/item", item);
app.use("/sessao", session);
app.use("/purchase", purchase);
app.use("/client", client);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
