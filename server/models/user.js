const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useCreateIndex', true);

let rolevalidation = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido',
};

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio'],
    },
    img: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolevalidation,
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('user', userSchema);