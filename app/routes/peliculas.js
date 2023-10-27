const express = require('express');
const con = require('../models/dbConnect.js');
const routerMysql = express.Router();

routerMysql.use(express.json());

function consultarPorId(id, callback) {
    con.query(`SELECT * FROM cartelera WHERE id = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
};

routerMysql.get('/peliculas', (req, res) => {
    con.query(`SELECT * FROM cartelera`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

routerMysql.get('/peliculas/titulo/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    con.query(`SELECT * FROM cartelera WHERE titulo = '${titulo}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

routerMysql.get('/peliculas/director/:director', (req, res) => {
    const director = req.params.director;
    console.log(director);
    con.query(`SELECT * FROM cartelera WHERE director = '${director}'`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});
routerMysql.post('/peliculas', (req, res) => {
    let newData = req.body;
    console.log(newData.titulo);
    var sql = `INSERT INTO cartelera (titulo, director, duracion) VALUES ('${newData.titulo}', '${newData.director}', '${newData.duracion}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        consultarPorId(result.insertId, function (resultado) {
            res.send(resultado);
        });
    });
});

routerMysql.put('/peliculas/:id', (req, res) => {
    let newData = req.body;
    const id = req.params.id;
    var sql = `UPDATE cartelera SET titulo = '${newData.titulo}' WHERE id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Udpated");
        consultarPorId(id, function (resultado) {
            res.send(resultado);
        });
    });
});

routerMysql.delete('/peliculas/:id', (req, res) => {
    const id = req.params.id;
    var sql = `DELETE FROM cartelera where id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('Deleted');
        res.send('Deleted user')
    });
});


module.exports = routerMysql;