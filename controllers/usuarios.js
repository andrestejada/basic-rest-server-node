const {response ,request} = require('express')


const usuariosGet =(req,res=response)=>{

    const {id,apikey} = req.query   
    res.json({
        msg:'get API',
        id,
        apikey
    })
}
const usuariosPost =(req=request,res=response)=>{
    const body = req.body

    res.json({
        msg:'Post API',
        body
    })
}

const usuariosPut =(req,res=response)=>{
    const id = req.params.id
    res.json({
        msg:'put API',
        id
    })
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut
}