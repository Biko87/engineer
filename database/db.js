// Invocamos a MySQL y realizamos la conexionconst mysql = require('mysql');
const mysql = require('mysql');
const connection = mysql.createConnection({
    //Con variables de entorno
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
});

connection.connect((err)=>{
    if (err) {
        console.log('No esta conectado a la DB'+ err);
        return       
    }
    console.log('¡Conectado a la DB!');
})

module.exports = connection;