//       MODULO PROCCES

//Para acceder a los argumentos que se pasen por consla
//Asi pa ver todo, a partir del indice 2 son los que ingresen
/*console.log(process.argv);

console.log(process.argv[2]);
console.log(process.argv[3]);*/

//Cuando no se sabe cuantos argumentos son o se quieren mas de 2 con un for

for (let i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
}