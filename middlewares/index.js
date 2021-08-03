const validarJwt = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');
const validarCampos = require('../middlewares/validarCampos');
const ValidarArchivo = require('../middlewares/validar-archivo');


module.exports={
    ...validarJwt,
    ...validarRoles,
    ...validarCampos,
    ...ValidarArchivo
}