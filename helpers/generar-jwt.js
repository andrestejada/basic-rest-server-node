const jwt = require("jsonwebtoken");

const generarJWT =(uid='')=>{
    return new Promise( (resolve,reject)=> {
        const payload = {uid}
        jwt.sign(payload,process.env.SECRETORPRIVETEKEY,{
            expiresIn:'4H'
        },(error,token)=>{
            if(error){
                console.log(error)
                reject('No se puede generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports= generarJWT