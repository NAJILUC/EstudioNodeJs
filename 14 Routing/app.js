const http = require('http');
const cursos = require('./cursos');

const servidor = createServer((req, res) => {
    const { method } = req;

    if (method === 'GET') {
        return manejarSolicitudGET(req, res);
    } else if (method === 'POST') {
        return manejarSolicitudPOST(req, res);
    } else {
        res.statusCode = 501;
        res.end(`El metodo no puede ser procesado por el servidor: ${method}`);
    }
});

function manejarSolicitudGET(req, res) {
    const path = req.url;

    if (path === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('Mi primer server y api');
    } else if (path === '/cursos') {
        res.end(JSON.stringify(cursos.infoCursos));
    } else if (path === '/cursos/programacion') {
        res.end(JSON.stringify(cursos.infoCursos.programacion));
    } else {
        res.statusCode = 404;
        res.end('El recurso no existe');
    }
}

function manejarSolicitudPOST(req, res){
    const path = req.url;

    if (path === '/cursos/programacion') {

        let cuerpo = '';
        req.on('data', contenido => {
            cuerpo += contenido.toString();
        });

        req.on('end', () => {
            console.log(cuerpo);

            cuerpo = JSON.parse(cuerpo);
            console.log(cuerpo.titulo);

        res.end('El server recibio solicitud POST');
        });

    } else {
        res.statusCode = 404;
        res.end('El recurso no existe');
    }
}

//BSHBAJBSHHABBSBAMSNNABMBNMAS
/*
const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/api-yaydoo-contracts/v1/contracts/all/parqueados',
    method: 'GET'
  };
  
  const req = request(options, res => {
    let data = '';
  
    res.on('data', chunk => {   
      data += chunk;
    });
  
    res.on('end', () => {
      console.log(data);
    });
  });
  
  req.on('error', error => {
    console.error(error);
  });
  
  req.end();
*/
const puerto = 3000;

servidor.listen(puerto, () => {
    console.log(`El servidor esta on en el puerto ${puerto}`);
});