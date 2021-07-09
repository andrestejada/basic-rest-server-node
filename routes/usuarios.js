const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuarioDelete } = require('../controllers/usuarios');
const { isRoleValido ,isEmailExist, isUserIdExist} = require('../helpers/validar-db');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
// const { validarCampos } = require('../middlewares/validarCampos');
const {
        validarJWT,
        esAdminRole,
        tieneRole,
        validarCampos
    } = require('../middlewares');
const router = Router();

router.get('/',usuariosGet);

router.post('/',[
    check('nombre','El nombre no es obligatorio').not().isEmpty() ,
    check('correo','El correo no es valido').custom(isEmailExist),
    check('password','El correo debe ser mayor a 6 caracteres').isLength({min:6, max:20}),
    check('rol').custom(isRoleValido),
    validarCampos
],usuariosPost);

router.put('/:id',[
    check('id','No es una id valido').isMongoId(),
    check('id').custom( isUserIdExist ) ,
    check('rol').custom(isRoleValido),
    validarCampos
],usuariosPut)

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLES','USER_ROLE'),
    check('id','No es una id valido').isMongoId(),
    check('id').custom( isUserIdExist ) ,
    validarCampos
],usuarioDelete)


module.exports = router