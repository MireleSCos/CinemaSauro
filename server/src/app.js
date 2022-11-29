const express = require("express");
const cors = require("cors");

const movie = require("./routes/movie");

const app = express();
const port = process.env.port | 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/filme", movie);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
