var pool = require("./connection");
const authenticator = require('otplib');
const totp = require('otplib'); 
const { all } = require("express/lib/application");

module.exports.displayToken = async function (secret) {
  try {
    let sql = `SELECT pessoa_token from pessoa where pessoa_secret = ?`;
    let pessoa = await pool.query(sql, [secret]);
    // let pessoa = JSON.parse(JSON.stringify(await pool.query(sql, [secret])));
    let token = pessoa[0].pessoa_token;
    console.log(token);
    return { status: 200, result: token };
  } catch (err) {
    console.log(err);
    return { status: 500, result: err };
  }
};

