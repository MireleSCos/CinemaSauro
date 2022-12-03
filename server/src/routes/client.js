const { Router } = require("express");

const db = require("../config/database");

const clientRouter = Router();

// Create a new client
clientRouter.post("/", async (req, res) => {
  try {
    const {
      nome
    } = req.body;

    const { rows } = await db.query(
      "INSERT INTO cliente (nome) " +
        "VALUES ($1) RETURNING id_cliente;",
      [nome]
    );

    return rows[0].id_cliente;

  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = clientRouter;