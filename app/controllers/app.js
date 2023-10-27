const express = require('express');
const app = express(); 

//Routers
const routerMysql = require('../routes/peliculas.js');
app.use('/api/', routerMysql);


const PUERTO = process.env.PORT || 8080;

app.listen(PUERTO, () => {
    console.log(`Puerto ${PUERTO}`);
});