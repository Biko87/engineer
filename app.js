// 1 - Invocamos a Express
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());//además le decimos a express que vamos a usar json

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});

//4 - El directorio public
app.use(express.static(__dirname + "/public"));

//5 - Establecemos el motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//6 -Invocamos a bcrypt
const bcrypt = require('bcryptjs');

//7- variables de session
const session = require('express-session');
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