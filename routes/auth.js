const {Router} = require('express');
const { validarCampos } = require('../middlewares/validarCampos');
const { check } = require('express-validator');
const { login, signInGoogle } = require('../controllers/auth');

const router = Router()

router.post('/login',[
    check('correo','el correo es obligatorio').isEmail(),
    check('password','el password es obligatorio').not().isEmpty(),
    validarCampos
],login)

router.post('/google',[
    check('id_token','El id_token es obligatorio').not().isEmpty(),
    validarCampos
],signInGoogle)

module.exports= router