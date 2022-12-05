const express = require("express");

const db = require("../config/database");

const router = express.Router();

// Cadastra uma sessão nova
router.post("/", async (req, res) => {
  try {
    const {
      salaId,
      filmeId,
      valor,
      data, //YYYY-MM-DD
      hora  //HH:MM  
    } = req.body;

    const duracao = (await db.query(
      "SELECT duracao FROM filme WHERE filme.id = $1", [filmeId]
    )).rows[0].duracao;

    const { rows } = await db.query(
      `SELECT (TIMESTAMP '${data} ${hora}', INTERVAL '${duracao} minutes') OVERLAPS\n`+
        "(sessao.data+sessao.hora, (SELECT make_interval(mins => filme.duracao)))\n"+
      "FROM sessao, filme\n"+
      "WHERE sessao.salaId = $1 AND filme.id = sessao.filmeId",
      [salaId]
    );

    if(rows && rows.some(row => row.overlaps)){
      return res.status(300).send({
        message: "A sessão não pode ser cadastrada pois entra em conflito com outras sessões na mesma sala",
      });
    }

    await db.query(
      "INSERT INTO sessao(salaId,filmeId,valor,data,hora) VALUES ($1,$2,$3,$4,$5)",
      [salaId,filmeId,valor,data,hora]
    );

    res.status(201).send({
      message: "Sessão cadastrada com sucesso",
      body: {
        sessao: {
          salaId,
          filmeId,
          valor,
          data,
          hora
        },
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Lista sessoes por id do filme
router.get("/:filmeId", async (req, res) => {
  const filmeId = req.params.filmeId;
  const date = req.query.date;

  let sessoesDocs;

  if(!date){
    sessoesDocs = (await db.query(
      "SELECT * FROM sessao WHERE filmeId = $1 ORDER BY data+hora", 
      [filmeId])
    ).rows;
  }else{
    sessoesDocs = (await db.query(
      `SELECT * FROM sessao WHERE filmeId = $1 AND data = '${date}' ORDER BY hora`, 
      [filmeId]
    )).rows;
  } 

  let sessoes = [];
  for(const sessao of sessoesDocs){
    const ingressoCount = (await db.query(
      "SELECT count(ingresso.id) FROM ingresso\n"+
      "WHERE ingresso.sessaoId = $1",
      [sessao.id]
    )).rows[0].count;

    const salaCapacidade = (await db.query(
      "SELECT sala.capacidade FROM sessao, sala\n"+
      "WHERE sessao.id = $1 AND sala.id = sessao.salaId",
      [sessao.id]
    )).rows[0].capacidade

    const livre = ingressoCount < salaCapacidade;

    sessoes.push({...sessao, livre});
  };

  res.status(201).send(sessoes);
}); 

module.exports = router;