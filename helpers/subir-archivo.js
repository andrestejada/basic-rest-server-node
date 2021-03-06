const path = require('path')
const { v4: uuidv4 } = require('uuid');


const subirArchivo =(files,extensionValida=['jpg','png','gif','jpeg'],carpeta='')=>{

    return new Promise( (resolve,reject)=>{
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[ nombreCortado.length -1]
        //validar extension        
        if(!extensionValida.includes(extension) ){
          return reject(`La extension ${extension} no es valida, las extensiones validas son ${extensionValida}`)
        }
        
        //cambiar en nombre del archivo
        const nombreTemp = uuidv4() + '.' + extension
        
       const uploadPath = path.join( __dirname , '../uploads/' ,carpeta, nombreTemp);
     
       archivo.mv(uploadPath, (err)=> {
         if (err) {
            reject(err)
         }
     
          resolve(nombreTemp)
       });
    });
};


module.exports={
    subirArchivo
}