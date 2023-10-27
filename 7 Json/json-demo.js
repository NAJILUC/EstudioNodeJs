const curso = require('./curso.json')

//Asi se accede a los datos del json
//console.log(curso.temas);

let info = {
    "titulo": "Aprende node",
    "numVistas": 252020,
    "nunLikes": 318568,
    "temas": [
        "Js",
        "Node"
    ],
    "esPublico": true
};


//De objeto a json
let infoJson = JSON.stringify(info);


//De json a objeto
let infoObjeto = JSON.parse(infoJson);

console.log(infoObjeto);