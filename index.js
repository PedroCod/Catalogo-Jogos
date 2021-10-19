require('dotenv').config()
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
 let message = "";


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const Jogos = require("./models/jogos");
const Confirmlogin = require("./models/confirmlogin");


app.get("/", async (req, res) => {
  
  const jogos = await Jogos.findAll();
  
  res.render("index", {
    jogos,
  });
});

  app.get("/detalhes/:id", async (req, res) => {
    const jogos = await Jogos.findByPk(req.params.id);
    
    res.render("detalhes", {
      jogos,
    });
  });

app.get("/cadastro", (req, res) => {
  res.render("cadastro",{
    message,
  });
});

app.get("/cadusuario", (req, res) => {
  res.render("cadusuario",{
    message
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/sobre", (req, res) => {
  res.render("sobre");
});

app.post("/new", async (req, res) => {
  const { nome, descricao, imagem, genero } = req.body;

  const jogo = await Jogos.create({
    nome,
    descricao,
    imagem,
    genero,
  });

  res.redirect("/",{
    jogo,
  });

});
app.post("/newcad", async (req,res) =>{
  const { nome, email, senha, confirmsenha } = req.body;

  const login = await Confirmlogin.create({
    nome,
    email,
    senha,
    confirmsenha,
  });
  res.render("index",{
    login,
  });
});
app.get("/logado", (req,res)=>{

});


app.get("/editar/:id", async (req, res) => {  
  const jogo = await Jogos.findByPk(req.params.id)
  res.render("editar", {    
    jogo,
    message,
  });

});

app.post("/editar/:id", async (req, res) => {
  const jogo = await Jogos.findByPk(req.params.id);

  const { nome, descricao, imagem, genero } = req.body;

  jogo.nome = nome;
  jogo.descricao = descricao;
  jogo.imagem = imagem;
  jogo.genero = genero

  const jogoEditado = await jogo.save();

  res.render("editar", {
    jogo: jogoEditado,
    message: "Jogo editado com sucesso!",
  });
});

app.get("/deletar/:id", async (req, res) => {
  const jogo = await Jogos.findByPk(req.params.id);

  res.render("deletar", {
    jogo,
  });
});
app.post("/deletar/:id", async (req, res) => {
  const jogo = await Jogos.findByPk(req.params.id);


  await jogo.destroy();

  res.render("index", {
    message: `Jogo ${jogo.nome} deletado com sucesso!`,
  });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

