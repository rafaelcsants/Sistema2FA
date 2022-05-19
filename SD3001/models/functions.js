var pool = require("./connection");
const authenticator = require('otplib');
const totp = require('otplib'); 
const { all } = require("express/lib/application");

module.exports.registerPessoa = async function (
  nome,
  email,
  pass,
) {
  try {
    var sql = "SELECT * FROM pessoa WHERE pessoa_email =?";
    let result = await pool.query(sql, [email]);
    if (result.length > 0)
      return { status: 401, result: { msg: "Já está registado" } };
    else {
      var sql = 'INSERT INTO pessoa (pessoa_nome, pessoa_email, pessoa_pass) VALUES (?,?,?)';
      let result = await pool.query(sql, [
        nome,
        email,
        pass,
      ])
      return { status: 200, result: { msg: "registado com sucesso" } };;
    }
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};

module.exports.loginPessoa = async function (email, pass) {
  try {
    let sql = "SELECT pessoa.pessoa_id from pessoa Where pessoa.pessoa_email = ? AND pessoa.pessoa_pass = ?";
    let result = await pool.query(sql, [email, pass]);
    if (result.length > 0) return { status: 200, result: result[0] };
    else return { status: 401, result: { msg: "Wrong email or password" } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};

module.exports.ativar2fa = async function (PessoaId) {
  try {
    let secret = totp.authenticator.generateSecret(20);
    let token = totp.authenticator.generate(secret);
    let sql = "UPDATE pessoa SET pessoa_secret = ? , pessoa_token = ? WHERE pessoa_id = ?";
    let result = await pool.query(sql, [secret,token,PessoaId]);
    return { status: 200, result: { msg: "Secret gerado com sucesso" } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};


module.exports.refreshToken = async function () {
  try {

    let sql1 = "select * from pessoa";
    var pessoas = JSON.parse(JSON.stringify(await pool.query(sql1)))
    // console.log(pessoas.length)

    for(let i=0; i < pessoas.length; i++){
    if(pessoas[i].pessoa_secret == null){
      void(0)
    }
    else{
    let token = totp.totp.generate(pessoas[i].pessoa_secret);
    let sql = "UPDATE pessoa SET pessoa_token = ? where pessoa_id = ?";
    let result = await pool.query(sql, [token, i+1]);
    // console.log(pessoas[i].pessoa_token);
    // console.log(totp.totp.timeRemaining());
    }
  }
    return { status: 200, result: { msg: "Token updated com sucesso" } };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};

setInterval(this.refreshToken, 1000, "Updating...");


module.exports.GetProfileById = async function(PessoaId) {
    try {
        let sql = "select * from pessoa where pessoa_id = ?";
        let result = await pool.query(sql,[PessoaId]);
        if (result.length > 0)  
            return {status: 200, result: result[0] };
        else return {status: 404, result: {msg: "Pessoa not found!"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
};  

module.exports.getAllPessoas = async function () {
  try {
    let sql = "Select * from pessoa";
    let result = await pool.query(sql);
    let pessoa = result;
    return { status: 200, result: pessoa };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};


