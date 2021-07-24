const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualiazarProducto, borrarProducto } = require('../controllers/productos');
const { isProductExist, isCategoryExist} = require('../helpers/validar-db');
const { validarJWT ,validarCampos, esAdminRole } = require('../middlewares');

const router = Router()

//Obtener todas las productos -publico
router.get('/',obtenerProductos)
//Obtener una categoria por id
router.get('/:id',[
    check('id','no es un id valido de mongo').isMongoId(),
    check('id').custom(isProductExist),
    validarCampos,
],obtenerProducto)


//crear Producto- cualquier usuario con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','la categoria es obligatoria').not().isEmpty(),
    check('categoria','no es un id de mongo valido').isMongoId(),
    check('categoria').custom(isCategoryExist),
    validarCampos
],crearProducto)
//Actualizar-privado cualquier token valido
router.put('/:id',[
    validarJWT,
    check('id','no es un id valido de mongo').isMongoId(),
    check('id').custom(isProductExist),
    validarCampos,
],actualiazarProducto)

//Borrar categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','no es un id valido de mongo').isMongoId(),
    check('id').custom(isProductExist),
    validarCampos
],borrarProducto)




module.exports= router