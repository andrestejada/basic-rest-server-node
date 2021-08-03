const path = require('path')
const fs = require('fs')
const { request, response } = require("express");
const {subirArchivo} = require('../helpers');
const {Usuario,Producto} = require("../models");
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const cargarArchivo =async(req=request,res=response)=>{ 
 
  try {
    const nombre = await subirArchivo(req.files)
    res.json({
      nombre
    });    
  } catch (msg) {
    res.status(400).json({msg})
  }
};


// const actualizarArchivo = async(req=request,res=response)=>{
//   const {coleccion,id} = req.params

//   let modelo;
//   switch (coleccion) {
//     case 'usuarios':
//       modelo = await Usuario.findById(id);
//       if(!modelo){
//         return res.status(400).json({msg:`El usuario con el id ${id} no existe`})
//       }
//       break;
//     case 'productos':
//       modelo = await Producto.findById(id);
//         if(!modelo){
//           return res.status(400).json({msg:`El producto con el id ${id} no existe`})
//         }
//       break;
//     default:
//       return res.status(500).json({msg:'Error en el servidor'});
//   };

//   //limpiar imagenes previas
//   if(modelo.img){
//     const pathImagen = path.join( __dirname,'../uploads',coleccion,modelo.img );
//     if( fs.existsSync(pathImagen)){
//         fs.unlinkSync(pathImagen)
//     }
//   }

//   const nombre = await subirArchivo(req.files,undefined,coleccion);
//   modelo.img = nombre;
//   await modelo.save();
  
//   res.json(modelo)
// };
const actualizarArchivo = async(req=request,res=response)=>{
  const {coleccion,id} = req.params

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`El usuario con el id ${id} no existe`})
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({msg:`El producto con el id ${id} no existe`})
        }
      break;
    default:
      return res.status(500).json({msg:'Error en el servidor'});
  };

  //limpiar imagenes previas
  if(modelo.img){
    const nombreArr = modelo.img.split('/');
    const nombre = nombreArr[ nombreArr.length -1 ]
    const [public_id] = nombre.split('.')
    cloudinary.uploader.destroy(public_id)
  }
  const { tempFilePath}= req.files.archivo
  const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

  // const nombre = await subirArchivo(req.files,undefined,coleccion);
  modelo.img = secure_url;
  await modelo.save();
  
  res.json(modelo)
};


const mostrarImagen =async(req=request ,res=response)=>{
  const {id,coleccion}= req.params
  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if(!modelo){
        return res.status(400).json({msg:`El usuario con el id ${id} no existe`})
      }
      break;
    case 'productos':
      modelo = await Producto.findById(id);
        if(!modelo){
          return res.status(400).json({msg:`El producto con el id ${id} no existe`})
        }
      break;
    default:
      return res.status(500).json({msg:'Error en el servidor'});
  };

  //limpiar imagenes previas
  if(modelo.img){
    const pathImagen = path.join( __dirname,'../uploads',coleccion,modelo.img );
    if( fs.existsSync(pathImagen)){
        return res.sendFile(pathImagen)
    }
  }

  const pathImgNotFound = path.join(__dirname,'../assets','no-image.jpg')
  res.sendFile(pathImgNotFound)
}


module.exports={
    cargarArchivo,
    actualizarArchivo,
    mostrarImagen,
}