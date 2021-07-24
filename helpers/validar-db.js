const { Categoria , Usuario ,Role, Producto } = require("../models");

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

const isCategoryExist = async(id)=>{
    const categoryExist = await Categoria.findById(id)
    if(!categoryExist){
        throw new Error(`La categoria con el id ${id} no existe`)
    }
}
const isProductExist = async(id)=>{
    const productoExist = await Producto.findById(id)
    if(!productoExist){
        throw new Error(`El Producto con el id ${id} no existe`)
    }
}

module.exports ={
    isRoleValido,
    isEmailExist,
    isUserIdExist,
    isCategoryExist,
    isProductExist
}