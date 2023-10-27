const http = require('http');

const servidor = http.createServer((req, res) => {
    res.end('Ola');
});

const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`El server esta en ${puerto}`);
});