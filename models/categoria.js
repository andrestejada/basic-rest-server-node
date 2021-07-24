
const {Schema,model } = require('mongoose')

const categoriaSchema = Schema({
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
    }
})

categoriaSchema.methods.toJSON = function(){
    const {__v,estado,...data} =this.toObject()
    return data
}

module.exports = model('Categoria',categoriaSchema)

