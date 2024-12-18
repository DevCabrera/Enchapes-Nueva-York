const express = require("express");
const fs = require("fs"); //file system
const router = express.Router();
const PATH_ROUTES = __dirname; //RUTA ABSOLUTA, BUSCA EN TODO 

const removeExtension = (fileName) => {
    return fileName.split('.').shift()   //split busca la extension del archivo y la separa ejemplo tracks.js--> [tracks], [js], en un nuevo array y shift nos traera el primero del array.
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)
    if (name !== 'index') {//si name es diferente a index
        console.log(`ruta cargada: ${name}`)
        router.use(`/${name}`, require(`./${file}`))  //api/name, .use que use y necesite file
    }
})
module.exports = router