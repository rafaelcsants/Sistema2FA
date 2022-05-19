var express = require("express");
var router = express.Router();
var mProd = require("../models/functions");


router.get('/:id', async function(req, res, next) {
  let PessoaId = req.params.id;
  console.log("Sending Profile with id "+PessoaId);
  let result = await mProd.GetProfileById(PessoaId);
  res.status(result.status).send(result.result);
});

router.post('/login',async function(req, res, next) {
  let email = req.body.email;
  let password = req.body.pass;
  let result = await mProd.loginPessoa(email,password);
  res.status(result.status).send(result.result);
});

router.put('/ativar2fa',async function(req, res, next) {
  let PessoaId = req.body.PessoaId;
  console.log("Pedido enviado with id "+PessoaId);
  let result = await mProd.ativar2fa(PessoaId);
  res.status(result.status).send(result.result);
});

router.put('/refreshToken',async function(req, res, next) {
  console.log("Tokens Refreshed");
  let result = await mProd.refreshToken();
  res.status(result.status).send(result.result);
});

router.post('/register',async function(req, res, next) {
    let nome = req.body.nome;
    let email = req.body.email;
    let pass = req.body.pass;
    let result = await mProd.registerPessoa(nome,email,pass);
    res.status(result.status).send(result.result);
  });
  

router.get("/", async function (req, res, next) {
  let result = await mProd.getAllPessoas();
  res.status(result.status).send(result.result);
});

module.exports = router;
