//const saludos = require('./saludos.js')
//Con este se puede importar unicamente las funciones que ean necesarias o que se quieran
const { saludar, saludarHolaMundo } = require('./saludos.js')

//console.log(saludos.saludar('Pepe'));
//console.log(saludos.saludarHolaMundo());

//Se llaman directamente las funciones porque ya estan definidas
console.log(saludar('Pepe'));
console.log(saludarHolaMundo());