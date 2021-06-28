const {response ,request} = require('express')
const Usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs')



const usuariosGet =async(req=request,res=response)=>{

    const {limite=5,desde=0} = req.query
    
    const query = {estado:true}

    const [total,usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .limit( Number(limite) )
        .skip( Number(desde) )
    ])
    res.json({
        total,
        usuarios
    })
}
const usuariosPost =async(req=request,res=response)=>{

    const {nombre , correo , password, rol} = req.body
    const usuario = new Usuario({nombre , correo , password, rol})
       
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt)
    //guarda en DB
    await usuario.save();
    res.json(usuario)
}

const usuariosPut =async(req,res=response)=>{
    const {id} = req.params
    const {_id,password , google , correo ,...resto} = req.body

    if(password){
         //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password,salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json(usuario)
}

const usuarioDelete = async (req=request,res=response)=>{

    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})
    res.json(usuario)    
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuarioDelete
}