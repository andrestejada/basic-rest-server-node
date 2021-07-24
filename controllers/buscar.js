const { response,request } = require("express");
const { ObjectId } = require("mongoose").Types;
const {Usuario, Producto, Categoria} = require('../models');

const coleccionesPermitidas =[
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

const buscarUsuarios =async(termino='',res=response)=>{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results:(usuario) ? [usuario] : []
        })
    };

    const regex = new RegExp(termino,'i')

    const usuario = await Usuario.find({
        $or:[ {nombre:regex} , {correo:regex} ],
        $and:[{estado:true}]
    })

    res.json({
        results:[usuario]
    })
}
const buscarProductos =async(termino='',res=response)=>{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const producto = await Producto.findById(termino)
        return res.json({
            results:(producto) ? [producto] : []
        })
    };

    const regex = new RegExp(termino,'i')

    const producto = await Producto.find({nombre:regex}).populate('categoria','nombre')

    res.json({
        results:producto
    })
}
const buscarCategorias =async(termino='',res=response)=>{
    const isMongoId = ObjectId.isValid(termino);
    if(isMongoId){
        const categoria = await Categoria.findById(termino)
        return res.json({
            results:(categoria) ? [categoria] : []
        })
    };

    const regex = new RegExp(termino,'i')

    const categoria = await Categoria.find({nombre:regex,estado:true})

    res.json({
        results:categoria
    })
}

const buscar = async(req=request,res=response)=>{

    const {coleccion , termino} = req.params

    if(!coleccionesPermitidas.includes(coleccion)){
        res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    };

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;
        case 'categorias':
            buscarCategorias(termino,res)
            break;
        case 'productos':
            buscarProductos(termino,res)
            break;   
        default:
            return res.status(500).json('se le olvido hacer esta busqueda');
    }

}

module.exports={
    buscar
}