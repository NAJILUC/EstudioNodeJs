const express = require('express');
const app = express(); 

//Routers
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js');
app.use('/api/cursos/matematicas', routerMatematicas);

const routerMysql = require('./routers/conncect.js');
app.use('/api/connect', routerMysql);

//Routing

//Se llama la constante donde esta la app de express y el metodo que se va a manejar, asi como la ruta
// es como el getMapping();

app.get('/', (req, res) => {
    res.send('Mi servidor');
});

app.get('/api/cursos', (req, res) => {
    res.send(infoCursos);
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`En el puerto ${PUERTO}`);
});