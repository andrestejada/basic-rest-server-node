const { response, request } = require("express")
const Usuarios = require("../models/usuarios")
const bcrypt = require('bcryptjs')
const generarJWT = require("../helpers/generar-jwt")
const { verifyGoogle } = require("../helpers/verifyGoogle")
const Usuario = require("../models/usuarios")
const login =async(req=request,res=response)=>{

    const {correo,password} = req.body
    try {
        //verificar si el email existe
        const usuario = await Usuarios.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'correo/password no son correctos - correo'
            })
        }
        //si el usuario esta activo
        if(!usuario.estado ){
            return res.status(400).json({
                msg:'correo/password no son correctos - Estado:false'
            })
        }

        //validar que el password este correcto
        const validarPassword = bcrypt.compareSync(password,usuario.password);
        if(!validarPassword ){
            return res.status(400).json({
                msg:'correo/password no son correctos - Contraseña'
            })
        }
        //generar un JWT
        const jwt = await  generarJWT(usuario.id)

        res.json({
         msg:'auth success',
         jwt
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Error habla con el administardor'})
    }
}

const signInGoogle =async(req,res=response)=>{

    const {id_token}= req.body
   try {

    const {nombre,correo,img} = await verifyGoogle(id_token)
    
    let usuario = await Usuario.findOne({correo});
    
    if(!usuario){
        //creqacion del usuario
        const data={
            nombre,
            correo,
            img,
            password:'google-auth',
            google:true
        }

        usuario = new Usuario(data);
        await usuario.save()
    }

    //si el usuario esta deshabilitado
    if(!usuario.estado){
        return res.status(401).json({
            msg:'Hable con el administrador usuario bloqueado'
        })
    }

    //generar un JWT
    const jwt = await  generarJWT(usuario.id)

    res.json({
        msg:'signIn success',
        usuario,
        jwt
    })

   } catch (error) {
       console.log(error)
       res.status(400).json({
           msg:'Token No valido',
           
       })
   }
}

module.exports={
    login,
    signInGoogle
}