// RutasWeb.js
const express = require('express');
const router = express.Router();

// // 8 - Invocamos a la conexion de la DB /* Connection DB*/
// const connection = require('../database/db');

// /*Selection table DB and results err connection*/
// router.get('/', function(req, res, next) {
//     connection.query('SELECT * FROM registro_usuarios', (error, results)=>{
//       if (error) {
//          throw error;
//       }else{
//         res.render('index', {results:results});
//       }
//     });
//   });

router.get('/', (req, res) => {
    res.render("index", {titulo : "Página Principal"});
  })
  
router.get('/servicios', (req, res) => {
      res.render("servicios", {titulo2 : "Mi titulo Servicios"});
    })



router.get('/login', (req, res) => {
      res.render("login");
    })

//9 - establecemos las rutas Login y registro
router.get('/registro', (req, res) => {
  res.render("registro");
})
    //10 - Método para la REGISTRACIÓN
    router.post('./registro', async (req, res)=>{
      const nombre = req.body.nombre;
      const correo = req.body.correo;
      const pass = req.body.pass;
      let passwordHash = await bcryptjs.hash(pass, 8);
        connection.query('INSERT INTO registro_usuarios SET ?',{nombre:nombre, correo:correo, pass:passwordHash}, async (error, results)=>{
            if(error){
                console.debug(error);
            }else{            
          res.send('Registro Éxitoso');        
            }
      });
    })

module.exports = router;