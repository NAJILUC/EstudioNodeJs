const express = require('express');
const con = require('../models/dbConnect.js');
const socioRouterMysql = express.Router();

socioRouterMysql.use(express.json());

function cantidadVehiculos(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT COUNT(id) as numero FROM parqueadero_vehiculo WHERE parqueadero_id = '${id}'`, function (err, result, fields) {
            if (err) reject(err);
            resolve(result[0].numero);
        });
    });
};

function estaLleno(id) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT vehiculos_maximos FROM parqueaderos WHERE id = '${id}'`, function (err, result, fields) {
            if (err) reject(err);
            var numeroMaximoVehiculos = result[0].vehiculos_maximos;
            cantidadVehiculos(id).then((numeroVehiculos) => {
                resolve(numeroVehiculos >= numeroMaximoVehiculos);
            }).catch((err) => {
                reject(err);
            });
        });
    });
}
function calcularHoras(fecha1, placa) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT pv.hora_ingreso FROM parqueadero_vehiculo pv where vehiculo_id = (SELECT v.id FROM vehiculos v where v.placa = '${placa}')`, function (err, result, fields) {
            if (err) reject(err);

            const diferencia = Math.abs(result[0].hora_ingreso - fecha1);
            const horas = Math.round(diferencia / (1000 * 60 * 60));
            try {
                resolve(horas);
            } catch (err) {
                reject(err);
            };
        });
    });
}


//Mostrar todos los parqueaderos
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

//Parqueaderos asignados a un usuario con el 'id'
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

//Ingreso de vehiculo a parqueadero con el 'id'
socioRouterMysql.post('/parqueadero/ingreso/:id', (req, res) => {
    let vehiculoData = req.body;
    if (Object.entries(req.body).length === 0) {
        return res.status(500).send('Inserte una placa');
    };
    if (vehiculoData.placa.length > 6) {
        return res.status(500).send('La placa debe contener 6 caracteres como maximo');
    };
    if (vehiculoData.placa.length < 6) {
        return res.status(500).send('La placa debe contener 6 caracteres como minimo');
    };

    const id = req.params.id;
    vehiculoData.placa = vehiculoData.placa.toUpperCase();
    let idVehiculo = "";
    var sqlE = `SELECT id FROM vehiculos WHERE placa = '${vehiculoData.placa}'`;

    con.query(sqlE, function (error, existe) {
        if (error) {
            return res.status(500).send('Error');
        }

        if (existe.length > 0) {
            return res.status(400).send(`El vehiculo ${vehiculoData.placa} se encuentra dentro de un paqueadero`);
        } else {

            estaLleno(id).then((lleno) => {
                if (lleno) {
                    return res.status(500).send(`El parqueadero con id:${id} se encuentra lleno`);
                } else {
                    console.log('no lleno');
                }
            
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
        }).catch((err) => {
            console.error(err);
        });
        }
    });
});

//Salida de vehiculo del parqueadero
socioRouterMysql.post('/parqueadero/salida', (req, res) => {

    let vehiculoData = req.body;
    if (Object.entries(req.body).length === 0) {
        return res.status(500).send('Inserte una placa');
    };
    if (vehiculoData.placa.length > 6) {
        return res.status(500).send('La placa debe contener 6 caracteres como maximo');
    };
    if (vehiculoData.placa.length < 6) {
        return res.status(500).send('La placa debe contener 6 caracteres como minimo');
    };
    vehiculoData.placa = vehiculoData.placa.toUpperCase();

    var pago = new Date().toISOString();

    let pagoF = "";
    const pagar = calcularHoras(new Date(), vehiculoData.placa).then(val => {
        pagoF = val;
        console.log(pagoF);
        var sqlPV = `SELECT p.costo FROM parqueaderos p INNER JOIN parqueadero_vehiculo pv ON p.id = pv.parqueadero_id where vehiculo_id = (SELECT v.id FROM vehiculos v where v.placa = '${vehiculoData.placa}')`;
       con.query(sqlPV, function (err, result) {
           if (err) throw err;
           var dele = `DELETE FROM parqueadero_vehiculo WHERE vehiculo_id = (SELECT v.id FROM vehiculos v where v.placa = '${vehiculoData.placa}')`;
           con.query(dele, function(err){
            if(err) console.log(err);
           });
           dele = `DELETE FROM vehiculos where placa = '${vehiculoData.placa}'`;
           con.query(dele, function(err){
            if(err) console.log(err);
           });
        return res.status(200).send(`Pague el valor de ${result[0].costo * pagoF}`);
       });
    });
    
});


module.exports = socioRouterMysql;