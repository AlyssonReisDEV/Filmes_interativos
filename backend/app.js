const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const dataFile = path.join(__dirname, "filmes.json");

app.use(cors());
app.use(bodyParser.json());

// GET - listar todos os filmes
app.get("/filmes", (req, res) => {
  fs.readFile(dataFile, "utf8", (err, data) => {
    if (err) return res.status(500).send("Erro ao ler os filmes");
    const filmes = JSON.parse(data);
    res.json(filmes);
  });
});

// POST - adicionar novo filme
app.post("/filmes", (req, res) => {
  const novoFilme = req.body;

  fs.readFile(dataFile, "utf8", (err, data) => {
    if (err) return res.status(500).send("Erro ao ler os filmes");

    const filmes = JSON.parse(data);
    filmes.push(novoFilme);

    fs.writeFile(dataFile, JSON.stringify(filmes, null, 2), (err) => {
      if (err) return res.status(500).send("Erro ao salvar o filme");
      res.status(201).json(novoFilme);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});