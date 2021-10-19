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

app.get("/", async (req, res) => {
  const jogo = await Jogos.findAll();
  
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", {
    jogo,
    message
  });
});

  app.get("/detalhes/:id", async (req, res) => {
    const jogo = await Jogos.findByPk(req.params.id);
    res.render("detalhes", {
      jogo,
    });
  });

app.get("/cadastro", (req, res) => {
  res.render("cadastro",{
    message,
  });
});

app.get("/sobre", (req, res) => {
  res.render("sobre",{
    message
  });
});

// app.get("/login", async (req, res) => {
//   res.render("login");
// });

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

  res.redirect("/");
});
// app.post("/newcad", async (req,res) =>{
//   const { nome, email, senha, confirmsenha } = req.body;
//   const jogo = await Jogos.findAll();
//   const login = await Confirmlogin.create({
//     nome,
//     email,
//     senha,
//     confirmsenha,
//   }); 
//   res.render("index",{
//     login,
//     jogo
//   })
// });

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

  res.render("index", {
    jogo: jogoEditado,
    message: "Jogo editado com sucesso!",
  });
});

app.get("/deletar/:id", async (req, res) => {
  const jogo = await Jogos.findByPk(req.params.id);

  res.render("deletar", {
    jogo,
    message
  });
});
app.post("/deletar/:id", async (req, res) => {
  const jogo = await Jogos.findByPk(req.params.id);


  await jogo.destroy();
  message = `Jogo ${jogo.nome} deletado com sucesso!`
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);