const { request, response } = require("express");
const { Categoria } = require("../models");


//obtner categoria-paginado-total-population
const obtenerCategorias =async(req=request,res=response)=>{
    try {
        const {limite=0,desde=0} = req.query;

        const query ={estado:true};

        const [categoria,total] = await Promise.all([
            Categoria.find(query)
                .skip( Number(desde) )
                .limit( Number(limite) )
                .populate('usuario','nombre')
            ,Categoria.countDocuments(query)
        ]);

        res.json({
            total,
            categoria,
        })
    } catch (error) {
        console.log(error)
    }
}

//obtener categoria por id
const obtenerCategoria= async(req=request,res=response)=>{
    const {id} = req.params
    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.json(categoria)
}

const crearCategoria =async(req=request,res=response)=>{
    try {
        const nombre = req.body.nombre.toUpperCase()
        const categoriaDB = await Categoria.findOne({nombre})
        
        if(categoriaDB){
            return res.status(400).json({
                msg:`la categoria ${categoriaDB.nombre} ya existe`
            })
        }
        //Generar la data a guardar
        const data ={
            nombre,
            usuario: req.usuario._id,
            
        }

        //guardar la categoria
        const categoria = new Categoria(data)
        await categoria.save()

        res.status(201).json(categoria)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Error en el servidor'
        })
    }
}

//actualizar categoria
const actualizarCategoria= async(req=request,res=response)=>{
    const {id} = req.params

    const { estado , usuario , ...data } = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id
    const categoria =await Categoria.findByIdAndUpdate(id,data,{new:true}).populate('usuario','nombre')
    
    res.json(categoria)
}

//borrar categoria cambiar estado false
const borrarCategoria= async(req=request,res=response)=>{
    const {id} = req.params

    const categoria = await 
        Categoria.findByIdAndUpdate(id,{estado:false},{new:true})
            .populate('usuario','nombre');
    res.json(categoria)
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}