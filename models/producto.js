
const {Schema,model } = require('mongoose')

const productoSchema = Schema({
    nombre:{
        type:String,
        required: [true,'la categoria es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        require:true
    },
    usuario:{
        type: Schema.Types.ObjectId,    
        ref:'Usuario',
        require:true
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    },
    descripcion:{
        type:String,        
    },
    precio:{
        type:Number,
        default:0
    },
    disponible:{
        type:Boolean,
        default:true
    }
})

productoSchema.methods.toJSON = function(){
    const {__v,estado,...data} =this.toObject()
    return data
}

module.exports = model('Producto',productoSchema)

