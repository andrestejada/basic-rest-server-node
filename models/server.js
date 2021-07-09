const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath ='/api/usuarios'
        this.authPath ='/api/auth'
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
       this.app.use( this.usuariosPath , require('../routes/usuarios'))
       this.app.use( this.authPath , require('../routes/auth'))
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