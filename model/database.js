import mysql from 'mysql';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'unitedboeing',
    database: 'articles'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the database!");
});