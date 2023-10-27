const fs = require('fs');

//Leer

fs.readFile('index.html', 'utf-8', (err, contenido) => {
    if (err) throw err;
    console.log(contenido);
});

//Renombrar

fs.rename('index.html', 'main.html', (err) => {
    if (err) throw err;
    console.log('Nombre cambiado');
});

//Agregar contenido

fs.appendFile('index.html', '\n<p>Al final</p>', (err) => {
    if (err) throw err;
    fs.readFile('index.html', 'utf-8', (err, contenido) => {
        if (err) throw err;
        console.log(contenido);
    });
});

//Reemplazar todo el archivo

fs.writeFile('index.html', 'Prueba', (err) => {
    if (err) throw err;
    fs.readFile('index.html', 'utf-8', (err, contenido) => {
        if (err) throw err;
        console.log(contenido);
    });
});

//Eliminar archivo

fs.unlink('index.html', (err) => {
    if (err) throw err;
    console.log('Archivo eliminado');
});