const express = require('express')
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const app = express()
const bodyParser = require('body-parser');
const User = require('../models/user');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

app.get('/user', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    User.find({}, 'name email role status google img')
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }

            User.countDocuments({}, (err, conteo) => {

                res.json({
                    ok: true,
                    users,
                    cuantos: conteo,
                });

            });

        });

});

app.post('/user', function(req, res) {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        // userDB.password = null,

        res.json({
            ok: true,
            user: userDB,
        });
    });

    /* if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario',
        });
    } else {
        res.json({
            persona: body
        });
    } */
});

app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }

        res.json({
            ok: true,
            user: userDB,
        });

    })

});

app.delete('/user/:id', function(req, res) {

    let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userDelete) => {

    let changeStatus = {
        status: false
    };

    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userDelete) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        };

        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        res.json({
            ok: true,
            user: userDelete,
        });
    });

});

// manejar error 400
/* Hola Manuel, es un middleware que uso en cada uno de los archivos controladores de ruta, ej: al ponerlo en ‘usuario.js’ captura errores no manejados que sucedan en 
cualquiera de las rutas get, post, put, etc de  ‘/usuario... ‘
Entiendo que al ser generico intercepta de primero todas las peticiones http que caigan dentro del ‘scope’ de esas rutas, y su ‘callback’ va resolver el error si se 
escapa de los otros middlewares en cada ruta especifica. */
app.use((err, req, res, next) => {
    if (!err) return next();
    // si hay error indicarlo
    res.status(400).json({
        ok: false,
        err: {
            code: 400,
            message: 'Peticion no valida',
            err: 'BAD_REQUEST'
        }
    });
});

module.exports = app;