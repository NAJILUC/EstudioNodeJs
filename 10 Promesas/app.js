const estatusPedido = () => {
    return  Math.random() < 0.8;
};

const miPedido = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (estatusPedido()) resolve('Pedido exitoso');
        else reject('Pedido rechazado');
    }, 3000);
});

//Lo siguiente comentado es lo mismo que lo que hay despues pero de otra forma
/*
const manejarPedido = (mensajeConfirmacion) => {
    console.log(mensajeConfirmacion);
};
const rechazarPedido = (mensajeError) => {
    console.log(mensajeError);
};

miPedido.then(manejarPedido, rechazarPedido);*/

miPedido
    .then((mensajeConfirmacion) => {
    console.log(mensajeConfirmacion);
    })
    .catch((mensajeError) => {
        console.log(mensajeError);
    });