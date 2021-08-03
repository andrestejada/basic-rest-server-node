const generarJWT = require('./generar-jwt');
const validarDB = require('./validar-db');
const verifyGOOGLE = require('./verifyGoogle');
const subirArchivo = require('./subir-archivo');



module.exports={
    ...generarJWT,
    ...validarDB,
    ...verifyGOOGLE,
    ...subirArchivo,
}