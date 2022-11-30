const express = require("express");

const db = require("../config/database");

const router = express.Router();

// Create a new room
router.post("/", async (req, res) => {
  try {
    const {
      capacidade
    } = req.body;

    const { rows } = await db.query(
      "INSERT INTO sala (capacidade) " +
        "VALUES ($1)",
      [capacidade]
    );

    res.status(201).send({
      message: "Sala cadastrada com sucesso",
      body: {
        sala: rows,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM sala");

    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
}); 

module.exports = router;