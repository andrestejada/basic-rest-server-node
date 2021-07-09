const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuarios = require("../models/usuarios");

const validarJWT = async(req=request,res=response,next)=>{
    const token  = req.header('x-token')

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }


    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVETEKEY)
       
        const usuario = await Usuarios.findById(uid)
        req.usuario = usuario

        if(!usuario){
            return res.status(401).json({
                msg:'Token no valido | usuario no existe'
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no valido | usuario estado:false'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'Token no valido'
        })
    }
    next()
}


module.exports= {
    validarJWT
}