const EventEmitter = require('events');

const emisorProductos = new EventEmitter();

emisorProductos.on('compra', (total, cantidad) => {
    console.log(`Se compro: ${total}`);
    console.log(`En la cantidad: ${cantidad}`);
});

emisorProductos.emit('compra', 500, 3);

