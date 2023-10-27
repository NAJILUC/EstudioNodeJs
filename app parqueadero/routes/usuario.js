const express = require('express');
const bcrypt = require('bcrypt');
const con = require('../models/dbConnect.js');
const userRouterMysql = express.Router();

userRouterMysql.use(express.json());

const BCRYPT_SALT_ROUNDS = 12;

function consultarPorCorreo(correo, callback){
	con.query(`SELECT * FROM usuario WHERE correo = '${correo}'`, function (err, result, fields) {
        if (err) throw err;
        callback(result);
    });
};




userRouterMysql.post('/registrarusuario', async (req,res) =>{
    let userData = req.body;
    try {
        consultarPorCorreo(userData.correo, function (resultado) {
            if (resultado.length > 0) {
                return res.status(400).send('El usuario ya existe');
            }
        });
        const contrasena = await bcrypt.hash(userData.contrasena, BCRYPT_SALT_ROUNDS);
        userData.contrasena = contrasena;
        const fecha = new Date().toISOString();
        var sql = `INSERT INTO usuario (contrasena, correo, fecha_registro, nombre, rol_id)
                   VALUES ('${userData.contrasena}', '${userData.correo}', '${fecha}', '${userData.nombre}', '2');`;
      
            con.query(sql, function (err, result) {
                if (!err) {
                    console.log("1 user inserted");
                    consultarPorCorreo(userData.correo, function (resultado) {
                        res.send(resultado);
                });
            }
            });
    } catch (error) {
        return console.log('error');
    }
});

module.exports = userRouterMysql;