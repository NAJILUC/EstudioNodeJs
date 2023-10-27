const http = require('http');

const servidor = http.createServer((req, res) => {
    console.log('nuevo');
    res.end('Hola');
});

const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`El servidor esta escuchando en el puerto ${puerto}`);
});