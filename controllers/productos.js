const { response, request } = require("express");
const { Producto } = require("../models");

const obtenerProductos =async(req=request,res=response)=>{

    try {
        const {limite=5,desde=0} = req.query
        const query = {estado:true}

        const [produtos,total] = await Promise.all([
            Producto.find(query)
                .limit(Number(limite))
                .skip( Number(desde) )
                .populate('usuario','nombre')
                .populate('categoria','nombre'),
                Producto.countDocuments(query) 
        ]);       
        res.json({
            total,
            produtos
        })
    } catch (error) {
        console.log(error)
    }
  
}

const obtenerProducto= async(req=request,res=response)=>{
    try {
        const {id} = req.params
        const producto = await Producto.findById(id)
            .populate('categoria')
            .populate('usuario','nombre')
        res.json(producto)
    } catch (error) {
        console.log(error)
    }
}

const crearProducto =async(req=request,res=response)=>{
  
    try {
        const {usuario,estado,nombre,...body} = req.body

        const productoDB = await Producto.findOne({nombre})
        if(productoDB){
            return res.status(401).json({
                msg:`El producto ${productoDB.nombre} ya se encuentra disponible`
            })
        }
    
        const data ={
            ...body,
            nombre: nombre.toUpperCase(),
            usuario: req.usuario._id,
        }
    
        const producto = new Producto(data)
        await producto.save()
        res.status(201).json(producto)
    } catch (error) {
        console.log(error)
    }
}

const actualiazarProducto = async(req=request,res=response)=>{
    try {
        const {id}= req.params
        const { usuario, estado, ...data} = req.body

        if(data.nombre){
            data.nombre = data.nombre.toUpperCase()
        };
        data.usuario = req.usuario._id
        const productoEditado = await Producto.findByIdAndUpdate(id,data,{new:true})
        res.json(productoEditado)
    } catch (error) {
        console.log(error)
    }
}

const borrarProducto = async(req=request,res=response)=>{
    const {id}= req.params
    const productoBorrar = await Producto.findByIdAndUpdate(id,{estado:false})
    res.json(productoBorrar)
}

module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualiazarProducto,
    borrarProducto
}