const express = require('express');
const mysql = require('mysql');
const routerMysql = express.Router();

routerMysql.use(express.json());

routerMysql.get('/', (req, res) => {
    res.send('Conectado');
});


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bdprueba"
});


function consultarPorId(id, callback) {
    con.query(`SELECT * FROM customers WHERE id = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
};

routerMysql.get('/data/:name', (req, res) => {
    const name = req.params.name;
        con.query(`SELECT * FROM customers WHERE name = '${name}'`, function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        });
});

routerMysql.post('/data', (req, res) => {
    let newData = req.body;
        var sql = `INSERT INTO customers (name, address) VALUES ('${newData.name}', '${newData.address}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            consultarPorId(result.insertId, function (resultado) {
                res.send(resultado);
            });
        });
});

routerMysql.put('/data/:id', (req, res) => {
    let newData = req.body;
    const id = req.params.id;
        var sql = `UPDATE customers SET address = '${newData.address}' WHERE id = ${id}`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Udpated");
            consultarPorId(id, function (resultado) {
                res.send(resultado);
            });
        });
});

routerMysql.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    var sql = `DELETE FROM customers where id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Deleted');
        res.send('Deleted user')
    });
});


module.exports = routerMysql;