const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        //rutas
        this.paths={
            authPath:       '/api/auth',
            buscarPath:       '/api/buscar',
            categoriaPath:  '/api/categorias',
            usuariosPath:   '/api/usuarios',
            productosPath:   '/api/productos',
        }       
        
        //conectar base de datos
        this.conectarDB()
        //Middleware
        this.middleware()
        //Rutas
        this.routes()
    }

    middleware(){
        //Cors
        this.app.use( cors() )

        //leer 
        this.app.use( express.json() )
        //directorio publico
        this.app.use( express.static('public') )
    }

    routes(){
        this.app.use( this.paths.authPath , require('../routes/auth'))
        this.app.use( this.paths.buscarPath , require('../routes/buscar'))
        this.app.use( this.paths.usuariosPath , require('../routes/usuarios'))
        this.app.use( this.paths.categoriaPath, require('../routes/categorias'))
        this.app.use( this.paths.productosPath, require('../routes/productos'))
    }

    async conectarDB(){
        await dbConnection()
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('corriendo en el puerto' + this.port )
        })
    }
}

module.exports= Server