const { response, request } = require("express")


const esAdminRole =(req=request,res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el rol sin validar el token primero'
        })
    }


    const {nombre,rol} = req.usuario
    
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`El ${nombre} no es administrador - no tiene permisos`
        })
    }

    next()
}

const tieneRole=(...roles)=>{
   
    return (req=request,res=response,next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg:'Se quiere verificar el rol sin validar el token primero'
            })
        }

        if( !roles.includes( req.usuario.rol ) ){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })
        }
        next()
    }
}

module.exports={
    esAdminRole,
    tieneRole
}