const express = require('express');
const app = express();

//require('dotenv').config()

const port = process.env.PORT || 5000;


// Motor de plantilla
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


app.use(express.static(__dirname + "/public"));

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