const mongoose = require('mongoose');
const unicoValidator = require('mongoose-unique-validator');

//Tabla de mongo
let Schema = mongoose.Schema;

//Validaciones para uno de los campos de la tabla
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

//Tabla usuarios
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        unique: true,
        type: String,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos

    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//se quita de la respuesta el envio de la contraseña
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

//se valida que el mail sea unico
usuarioSchema.plugin(unicoValidator, { message: '{PATH} debe de ser unico' });

//se envia el usuario
module.exports = mongoose.model('usuario', usuarioSchema);