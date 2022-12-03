const express = require("express");

const db = require("../config/database");

const router = express.Router();

const atoresDoFilme = async (filmeId) => {
  const atores = 
      (await db.query("SELECT ator.nome FROM ator, atuacao "+
                      "WHERE ator.id=atuacao.atorId AND atuacao.filmeId=$1", 
                      [filmeId])).rows
    const nomesAtores = atores.map(ator => ator.nome);
    return nomesAtores;
}

//Listar todos os filmes
router.get("/", async (req, res) => {
  const filmesDocs = (await db.query("SELECT * FROM filme")).rows;

  let filmes = []
  for(const filmeDoc of filmesDocs) {
    const atores = await atoresDoFilme(filmeDoc.id);
    filmes.push({...filmeDoc, atores});
  };

  res.status(201).send(filmes);
});

//Listar todas as estreias
router.get("/estreia", async (req, res) => {
  const filmesDocs = (await db.query("SELECT * FROM filme WHERE isEstreia=true")).rows;

  let filmes = []
  for(const filmeDoc of filmesDocs) {
    const atores = await atoresDoFilme(filmeDoc.id);
    filmes.push({...filmeDoc, atores});
  };

  res.status(201).send(filmes);
});

//Busca filme pelo id
router.get("/:id", async (req, res) => {
  const filmeDoc = (await db.query("SELECT * FROM filme WHERE id=$1", [req.params.id])).rows[0];

  const atores = await atoresDoFilme(filmeDoc.id);
  const filme = {...filmeDoc, atores};

  res.status(201).send(filme);
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
      atores,
      isNacional,
      isEstreia,
    } = req.body;

    const filmeId = (await db.query(
        "INSERT INTO filme (nome, censura, duracao, categoria, empresa, isNacional, isEstreia) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [nome, censura, duracao, categoria, empresa, isNacional, isEstreia]
    )).rows[0]["id"];

    await atores.forEach(async ator => {
      let atorDoc = (await db.query("SELECT id FROM ator WHERE nome = $1",[ator])).rows[0];

      if(!atorDoc){
        atorDoc = (await db.query("INSERT INTO ator(nome) VALUES ($1) RETURNING id",[ator])).rows[0];
      }
      const atorId = atorDoc.id;

      await db.query("INSERT INTO atuacao(atorId, filmeId) VALUES ($1, $2)", [atorId, filmeId]);
    }); 

    res.status(201).send({
      message: "Filme cadastrado com sucesso",
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
