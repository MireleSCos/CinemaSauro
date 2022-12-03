const express = require("express");

const db = require("../config/database");

const router = express.Router();

// Cria ingresso com id da sessao
router.post("/", async (req, res) => {
  try {
    const {
      sessaoId
    } = req.body;

    const ingressoCount = (await db.query(
      "SELECT count(ingresso.id) FROM ingresso\n"+
      "WHERE ingresso.sessaoId = $1",
      [sessaoId]
    )).rows[0].count;

    const salaCapacidade = (await db.query(
      "SELECT sala.capacidade FROM sessao, sala\n"+
      "WHERE sessao.id = $1 AND sala.id = sessao.salaId",
      [sessaoId]
    )).rows[0].capacidade

    if(ingressoCount >= salaCapacidade){
      return res.status(300).send({
        message: "A sessao já possui a quantidade máxima de ingressos alocados",
      });
    }
    
    const ingressoId = (await db.query(
      "INSERT INTO ingresso (sessaoId) " +
        "VALUES ($1) RETURNING id",
      [sessaoId]
    )).rows[0].id;

    res.status(201).send({
      message: "Ingresso criado com sucesso",
      body: {
        id: ingressoId,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;