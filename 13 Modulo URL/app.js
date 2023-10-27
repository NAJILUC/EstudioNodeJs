const miURL = new URL('https://www.ejemplo.com/curso/programacion?ordenar=vistas&nivel=1');

console.log(miURL.hostname);
console.log(miURL.pathname);
console.log(miURL.searchParams);
console.log(miURL.searchParams.get('ordenar'));
console.log(miURL.searchParams.get('nivel'));