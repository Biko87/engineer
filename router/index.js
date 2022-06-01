// RutasWeb.js
const express = require('express');
const router = express.Router();

/* Connection DB*/
const connection = require('../database/db');

/*Selection table DB and results err connection*/
router.get('/', function(req, res, next) {
    connection.query('SELECT * FROM registro_usuarios', (error, results)=>{
      if (error) {
         throw error;
      }else{
        res.render('index', {results:results});
      }
    });
  });

router.get('/', (req, res) => {
    res.render("index", {titulo : "Página Principal"});
  })
  
router.get('/servicios', (req, res) => {
      res.render("servicios", {titulo2 : "Mi titulo Servicios"});
    })

router.get('/registro', (req, res) => {
      res.render("registro");
    })

router.get('/login', (req, res) => {
      res.render("login");
    })

module.exports = router;