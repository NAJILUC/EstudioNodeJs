function mostrarTema(tema) {
    console.log(`I am learning ${tema}`);
}

function sumar(a, b) {
    console.log(a + b);
}

/*
setImmediate(mostrarTema, '222');
console.log('Antes');

setImmediate(mostrarTema, 'node.js');

console.log('despues');*/

//setTimeout(mostrarTema, 5000, 'nodejs', 'Prueba');
//setTimeout(sumar, 2000, 5, 5);

setInterval(sumar, 1500, 20, 5);