const Role = require("../models/role");
const Usuario = require("../models/usuarios");

const isRoleValido = async(rol='')=>{
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registro en la db`)
        }
}
const isEmailExist= async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo})
    if(existeEmail){
        throw new Error(`El usuario con el correo ${correo} ya existe`)
    } 
}
const isUserIdExist= async(id)=>{
    const userExist = await Usuario.findById(id)
    if(!userExist){
        throw new Error(`El usuario con el id ${id} no existe`)
    } 
}

module.exports ={
    isRoleValido,
    isEmailExist,
    isUserIdExist
}