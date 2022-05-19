var mysql = require("mysql");
var util = require("util");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "10.10.3.10",
  user: "usercon",
  password: "secret",
  database: "mfa",
  port: 3306,
  multipleStatements: true,
});

pool.query = util.promisify(pool.query);

module.exports = pool;
