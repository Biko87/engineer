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
            alertTitle: "¡Te has registrado con Éxito!",
            alertIcon:'success',
            showConfirmButton: false,
            timer: 4000,
            ruta: ''
          });
                //res.redirect('/');         
            }
          
      });
    })
  

// Metodo para la autenticacion
router.post('/auth', async (req, res)=> {
	const correo = req.body.correo;
	const pass = req.body.password; 
  const salt = 8;   
  const passwordHash = await bcrypt.hash(pass, salt);
	if (correo && pass) {
		connection.query('SELECT * FROM registro_usuarios WHERE correo = ?', {correo:correo, password:passwordHash}, async (error, results)=> {
			if( pass.length == 0 || !(await bcrypt.compare(pass, results.password)) ) {
        res.send('Correo o Contraseña incorrecta');    
				// res.render('login', {
        //                 alert: true,
        //                 alertTitle: "Error",
        //                 alertMessage: "USUARIO y/o PASSWORD incorrectas",
        //                 alertIcon:'error',
        //                 showConfirmButton: true,
        //                 timer: false,
        //                 ruta: 'login'    
        //             });
				
				//Mensaje simple y poco vistoso
                //res.send('Incorrect Username and/or Password!');				
			} else {         
        res.send('Bienvenido');  
				//creamos una var de session y le asignamos true si INICIO SESSION       
				// req.session.loggedin = true;                
				// req.session.name = results[0].name;
				// res.render('login', {
				// 	alert: true,
				// 	alertTitle: "Conexión exitosa",
				// 	alertMessage: "¡LOGIN CORRECTO!",
				// 	alertIcon:'success',
				// 	showConfirmButton: false,
				// 	timer: 1500,
				// 	ruta: ''
				// });        			
			}			
			res.end();
		});
	} else {	
		res.send('Please enter user and Password!');
		res.end();
	}
});

module.exports = router;