const promesaCumpl = false;

const miPromesa = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (promesaCumpl) resolve('Promesa cumplida');
        else reject('Promesa rechazada');
    }, 3000);
});

const manejarPromCump = ((valor) => {
    console.log(valor);
});
const manejarPromRech = ((razonRechazo) => {
    console.log(razonRechazo);
});

miPromesa.then(manejarPromCump,manejarPromRech);