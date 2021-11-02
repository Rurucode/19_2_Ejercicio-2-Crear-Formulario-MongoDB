const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const url = "mongodb://localhost:27017/";
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
    
app.post('/nombre', urlencodedParser, (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(req.body.nombre);
        dbo.createCollection(req.body.colecccion, function(err, res) {
          if (err) throw err;
          console.log("Colección creada");
          db.close();
        });
      });
});

//Insertar dentro de una coleccion de una BD
app.post('/primerdato', urlencodedParser, (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Empresa");
        const objetoDatos = {
            nombre: req.body.elnombre,
            direccion: req.body.direccion
        }
        
        dbo.collection("Clientes").insertOne(objetoDatos, function(err, res) {
          if (err) throw err;
          console.log("Documento insertado");
          db.close();
        });
      });
  });
  

app.listen(3000);

