var port = process.env.PORT || 8080;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var config = require("./config.json");

app.use(express.static(__dirname))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to google cloud sql
function getConnection () {
  return mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    socketPath: config.MYSQL_SOCKET_PATH,
    database: config.MYSQL_DATABASE
  });
}

function createContact (data, cb) {
  var connection = getConnection();
  connection.connect();
  connection.query('INSERT INTO contacts SET ?', data, function (err, result) {
    if(err) {
      console.error("error connection: " + err.stack);
      throw err;
    }
  });
  connection.end(function(err) {
    if(err) {
      console.error("Error ending connection: " + err);
    }
  });
}

// routes
app.get("/", function(req, res){
  res.sendFile("/index.html");
});

app.post("/contact", function(req, res, next) {
  var data = req.body;
  createContact(data, function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect(req.baseUrl + '/');
});

// start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
