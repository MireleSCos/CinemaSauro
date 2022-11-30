const express = require("express");

const db = require("../config/database");

const router = express.Router();

// Create a new item
router.post("/", async (req, res) => {
  try {
    const {
      valor,
      nome,
    } = req.body;

    const { rows } = await db.query(
      "INSERT INTO item (valor, nome) " +
        "VALUES ($1, $2)",
      [valor, nome]
    );

    res.status(201).send({
      message: "Item cadastrado com sucesso",
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM item");

    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
}); 

// Get a single item by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { rows } = await db.query("SELECT * FROM item WHERE id = $1", [id]);

    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
}); 

module.exports = router;