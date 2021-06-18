const express = require('express')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath ='/api/usuarios'
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
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('corriendo en el puerto' + this.port )
        })
    }
}

module.exports= Server