const express = require('express');
const app = express(); 

//Routers
const userRouterMysql = require('../routes/usuario.js');
app.use('/api/usuario', userRouterMysql);
const socioRouterMysql = require('../routes/parqueaderoSocio.js');
app.use('/api/socio', socioRouterMysql);
const adminRouterMysql = require('../routes/parqueaderoAdmin.js');
app.use('/api/admin', adminRouterMysql);


const PUERTO = process.env.PORT || 8080;

app.listen(PUERTO, () => {
    console.log(`Puerto ${PUERTO}`);
});