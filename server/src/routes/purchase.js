const express = require("express");

const db = require("../config/database");

// const moment = require("moment");

const router = express.Router();

// Create a new purchase

router.post("/", async (req, res) => {
  try {
    const data = new Date().toISOString();
    const { nome, itens, sessao } = req.body;

    const { sessaoId, valor } = sessao;
    const ingressoCount = (await db.query(
      "SELECT count(ingresso.id) FROM ingresso\n"+
      "WHERE ingresso.sessaoid = $1",
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
    
    const clienteId = (await db.query(
      "INSERT INTO cliente (nome) " +
        "VALUES ($1) RETURNING id;",
      [nome]
    )).rows[0].id;

    const compraId = (await db.query(
      "INSERT INTO compra (data_compra, clienteId) " +
        "VALUES ($1, $2) RETURNING id;",
      [data, clienteId]
    )).rows[0].id;

    itens.forEach(async (item) => {
      const { itemId } = item;
      await db.query(
        "INSERT INTO compra_item (itemId, compraId) " +
          "VALUES ($1, $2);",
        [itemId, compraId]
      );
    });

    await db.query(
      "INSERT INTO compra_ingresso (ingressoId, compraId) " +
        "VALUES ($1, $2);",
      [ingressoId, compraId]
    );

    return res.status(201).send({
      compraId: compraId,
      totalPurchase: itens.reduce((acc, item) => acc + item.preco, valor),
      ingressoId: ingressoId,
    });

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
