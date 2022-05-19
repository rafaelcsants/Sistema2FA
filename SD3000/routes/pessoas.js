var express = require("express");
var router = express.Router();
var mProd = require("../models/functions");


router.get('/displaytoken', async function(req, res, next) {
  let secret = req.query.secret;
  let result = await mProd.displayToken(secret);
  res.status(result.status).send(result.result);
});



module.exports = router;
