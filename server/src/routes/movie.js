const express = require("express");

const db = require("../config/database");

const router = express.Router();

//Listar todos os filmes
router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM filme");

  res.status(201).send(rows);
});

//Listar todas as estreias
router.get("/debut", async (req, res) => {
});

//Busca filme pelo id
router.get("/:id", async (req, res) => {
  
});

//Cadastra filme novo
router.post("/", async (req, res) => {
  try {
    const {
      nome,
      censura,
      duracao,
      categoria,
      empresa,
      isNacional,
      isEstreia,
    } = req.body;

    const { rows } = await db.query(
      "INSERT INTO filme (nome, censura, duracao, categoria, empresa, isNacional, isEstreia) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [nome, censura, duracao, categoria, empresa, isNacional, isEstreia]
    );

    res.status(201).send({
      message: "Filme cadastrado com sucesso",
      body: {
        filme: rows,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
