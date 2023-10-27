const express = require('express');
const con = require('../models/dbConnect.js');
const socioRouterMysql = express.Router();

socioRouterMysql.use(express.json());

socioRouterMysql.get('/parqueadero/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT v.* FROM vehiculos v INNER JOIN parqueadero_vehiculo pv ON v.id = pv.vehiculo_id 
                 WHERE pv.parqueadero_id = ${id}`;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send('Parqueadero no encontrado o vacio');
        } else {
            res.send(result);
        };
    });
});

socioRouterMysql.get('/parqueadero/asignado/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM parqueaderos WHERE usuario_id = ${id}`;

    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send('Socio no encontrado o sin parqueaderos asignados');
        } else {
            res.send(result);
        };
    });
});

socioRouterMysql.post('/parqueadero/ingreso/:id', (req, res) => {
    const id = req.params.id;
    let vehiculoData = req.body;
    vehiculoData.placa = vehiculoData.placa.toUpperCase();
    let idVehiculo = "";
    var sqlE = `SELECT id FROM vehiculos WHERE placa = '${vehiculoData.placa}'`;
    con.query(sqlE, function (error, existe) {
        if (error) {
            return res.status(500).send('Error');
        }

        if(existe.length > 0){
            return res.status(400).send(`El vehiculo ${vehiculoData.placa} se encuentra dentro de un paqueadero`);
        }else {
            var sqlV = `INSERT INTO vehiculos (placa) VALUES ('${vehiculoData.placa}')`;
            const fecha = new Date().toISOString();
            con.query(sqlV, function (err, result) {
                if (err) throw err;
                console.log(`Se incerto el vehiculo ${vehiculoData.placa}`);
                idVehiculo = result.insertId;

                var sqlPV = `INSERT INTO parqueadero_vehiculo (hora_ingreso, parqueadero_id, vehiculo_id) 
                 VALUES ('${fecha}', ${id}, ${idVehiculo})`;
                con.query(sqlPV, function (err, result) {
                    if (err) throw err;
                    res.send(`Se incerto el vehiculo ${vehiculoData.placa} en el parqueadero ${id}`);
                });
            });
        }
    });
});
    


module.exports = socioRouterMysql;