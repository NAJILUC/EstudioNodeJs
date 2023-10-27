const express = require('express');
const mysql = require('mysql');
const dbConfig = require("../config/db.config.js");
const routerMysql = express.Router();

routerMysql.use(express.json());

const con = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = con;