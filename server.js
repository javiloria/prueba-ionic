
const rp = require("request-promise");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const ip = require("ip");
var app = express();

const path = require('path');
/*
app.use(express.static(__dirname+'/dist/photo-rc1'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/photo-rc1/index.html'));
});
app.use(
  cors({
    origin: true,
    exposedHeaders: "x-access-token"
  })
);*/
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(bodyParser.json());

/*
// ENDPOINT:

//ESte post funciona para registrar la informacion de manera local en el servidor 
//del nuevo usuario lo que se le pide es:
app.post("/registrarusuario", urlencodedParser, (req, res) => {
  let body = _.pick(req.body, ["name","url"]);
  console.log("POST /registrarusuario:");
  YO.name = body.name;
  YO.url = body.url;
  res.json({ status: "success", message: body});
});
*/
//get para ver los status 
// el numero de player logre que se hiciera automatico , genial !
app.get("/jugador", urlencodedParser, (req, res) => {
  console.log(" GET /jugador:");
  client.connect();

client.query('select * from usuario;'
  , (err, response) => {
  if (err) throw err;
  res.json(response)
  client.end();
});

});


//metodo que pinta todo en el angular
app.get("/partidas", urlencodedParser, (req, res) => {
  res.json({ status: "success", message: partidas });
});




// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000);