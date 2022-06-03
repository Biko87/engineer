// RutasWeb.js
const express = require('express');
const router = express.Router();
//Invocamos a bcrypt
const bcrypt = require('bcryptjs');

// Invocamos a la conexion de la DB /* Connection DB*/
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

//establecemos las rutas Login y registro
router.get('/registro', (req, res) => {
      res.render("registro");
    })

router.get('/login', (req, res) => {
      res.render("login");
    })

//Método para registrar
router.post('/registro', async (req, res)=>{
    const nombre = req.body.nombre;
    const correo = req.body.correo;
    // Primero vamos a hashear la contraseña
    const password = req.body.password;
    // Iteracción de 8 ciclos, Entre más rondas, mejor protección, pero más consumo de recursos. 8 está bien.
    const salt = 8;
    let passwordHaash = await bcrypt.hash(password, salt);
    connection.query('INSERT INTO registro_usuarios SET ?',{nombre:nombre, correo:correo, password:passwordHaash}, async (error, results)=>{
            if(error){
                console.log(error);
            }else{            
          res.render('registro', {
            alert: true,
            alertTitle: "¡Registro Éxitoso!",
            alertMessage: "¡Te has registrado con Éxito!",
            alertIcon:'success',
            showConfirmButton: false,
            timer: 5000,
            ruta: ''
          });
                //res.redirect('/');         
            }
          
      });
    })

module.exports = router;