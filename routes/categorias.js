const {Router, response} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoria , obtenerCategorias,borrarCategoria,actualizarCategoria } = require('../controllers/categorias');
const { isCategoryExist} = require('../helpers/validar-db');
const { validarJWT ,validarCampos, esAdminRole } = require('../middlewares');

const router = Router()

//Obtener todas las categorias -publico
router.get('/', obtenerCategorias);

//Obtener una categoria por id
router.get('/:id',[
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom( isCategoryExist ),
    validarCampos
],obtenerCategoria)

//crear categoria- cualquier usuario con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)
//Actualizar-privado cualquier token valido
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(isCategoryExist),
    validarCampos
],actualizarCategoria)

//Borrar categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','no es un id de mongo valido').isMongoId(),
    check('id').custom(isCategoryExist),
    validarCampos
],borrarCategoria)



module.exports= router