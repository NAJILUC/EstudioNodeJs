const express = require('express');
const con = require('../models/dbConnect.js');
const adminRouterMysql = express.Router();

adminRouterMysql.use(express.json());

function consultarPorId(id, callback) {
    con.query(`SELECT * FROM parqueaderos WHERE id = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
};
function consultarUsuarioPorId(id, callback) {
    con.query(`SELECT * FROM usuario WHERE id = '${id}'`, function (err, result, fields) {
        if (err) throw err;
        callback(result);

    });
};

adminRouterMysql.get('/parqueaderos', (req, res) => {
    con.query(`SELECT * FROM parqueaderos`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

adminRouterMysql.get('/parqueaderos/:id', (req, res) => {
    const id = req.params.id;
    con.query(`SELECT * FROM parqueaderos WHERE id = ${id}`, function (err, result, fields) {
        if (err) throw err;
        if (result.length == 0) {
            res.status(404).send('Parqueadero no encontrado');
        } else {
            res.send(result);
        };
    });
});

adminRouterMysql.put('/parqueaderos/:id', (req, res) => {
    let newData = req.body;
    const id = req.params.id;
    var sql = `UPDATE parqueaderos SET costo = '${newData.costo}' WHERE  id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.affectedRows == 0) {
            res.status(404).send('Parqueadero no encontrado');
        } else {
            console.log('Update');
            consultarPorId(id, function (resultado) {
                res.send(resultado);
            });
        }
    });
});

adminRouterMysql.delete('/parqueaderos/:id', (req, res) => {
    const id = req.params.id;
    var sql = `DELETE FROM parqueaderos WHERE id = ${id}`;
    var parqueaderoName = "";
    console.log(parqueaderoName);
    consultarPorId(id, function (resultado) {
        parqueaderoName = resultado;
    });
    con.query(sql, function (err, result) {
        if (result.affectedRows == 0) {
            res.status(404).send('Parqueadero no encontrado');
        } else {
            const combinedData = {
                parqueadero: parqueaderoName,
                mensaje: 'El parqueadero se elimino.'
            };
            if (err) throw err;
            console.log('Deleted');
            res.json(combinedData);
        }
    });
});

adminRouterMysql.post('/parqueaderos', (req, res) => {
    let parqueaderoData = req.body;
    try {
        const fecha = new Date().toISOString();
        var sql = `INSERT INTO parqueaderos (costo, fecha_registro, nombre, vehiculos_maximos, usuario_id)
                   VALUES ('${parqueaderoData.costo}', '${fecha}', '${parqueaderoData.nombre}', 
                   '${parqueaderoData.vehiculos_maximos}', '${parqueaderoData.usuario_id}');`;

        con.query(sql, function (err, result) {
            if (!err) {
                console.log("1 parqueadero inserted");
                consultarUsuarioPorId(parqueaderoData.usuario_id, function (resultado) {
                });
                consultarPorId(result.insertId, function (resultado) {
                    res.send(resultado);
                });
            } else {
                res.send(`El usuario socio con el Id: ${parqueaderoData.usuario_id} no existe.`);
            }
        });
    } catch (error) {
        return console.log('error');
    }
});

module.exports = adminRouterMysql;