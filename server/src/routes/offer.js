const express = require("express");

const db = require("../config/database");

const router = express.Router();

// Create a new offer
router.post("/", async (req, res) => {
  try {
    const {
      dia_semana,
      id_item,
    } = req.body;

    const { rows } = await db.query(
      "INSERT INTO oferta (dia_semana, id_item) " +
        "VALUES ($1, $2)",
      [dia_semana, id_item]
    );

    res.status(201).send({
      message: "Oferta cadastrada com sucesso",
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all items for a given day
router.get("/:dia", async (req, res) => {
  try {
    const { dia } = req.params;

    const { rows } = await db.query(`SELECT I.nome, I.valor FROM item I, oferta O 
      WHERE I.id_item = O.id_item and dia_semana = '${dia}'`);

    if(rows.length === 0) {
      res.status(404).send({
        message: "Nenhuma oferta encontrada para o dia atual",
      });
    }

    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err);
  }
}); 

module.exports = router;