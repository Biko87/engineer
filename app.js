// 1 - Invocamos a Express
const express = require('express');
const app = express();
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRoutes = require('./router/login');

app.use('/', loginRoutes);

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'buscoingeniero'
 }, 'single'));

 app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


//4 - El directorio public
app.use(express.static(__dirname + "/public"));

//5 - Establecemos el motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


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