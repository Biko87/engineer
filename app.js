// 1 - Invocamos a Express
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5000;

// Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
//además le decimos a express que vamos a usar json
app.use(express.json());

// Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

// El directorio public
app.use(express.static(__dirname + "/public"));

//Establecemos el motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// variables de session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Rutas web
app.use('/', require('./router/index'));


app.use((req, res, next) => {
    res.status(404).render("404", {
        title: "404",
        description: "Ooooppps.... Hay un error"
    });
  })

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})