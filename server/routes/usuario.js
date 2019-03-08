//para poder hacer peticiones http
const express = require('express');

//encriptacion de contraseñas
const bcrypt = require('bcrypt');

//complemento para validaciones
const _ = require('underscore');

//se importa la tabla usuario
const Usuario = require('../models/usuario');

const app = express();

///////////////////////////
// API REST
//////////////////////////

//GET usuario
app.get('/usuario', function(req, res) {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(5)
        .exec((err, usuariosDB) => {
            if (err) {
                return res.status(400).json({
                    estado_Post: false,
                    err
                });
            } else {
                Usuario.count({ estado: true }, (err, conteo) => {
                    res.json({
                        conteo: conteo,
                        estado_Post: true,
                        usuarios: usuariosDB
                    });
                })
            }
        })
});

//POST usuario
app.post('/usuario', function(req, res) {
    let body = req.body;

    //se extraen los parametros del post
    let user = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    //Se graba en BD
    user.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                estado_Post: false,
                err
            });
        } else {
            res.json({
                estado_Post: true,
                usuario: usuarioDB //este es el usuario que se graba en DB
            });
        }
    });
})

//PUT usuario
app.put('/usuario/:idUsuario', function(req, res) {
    let id = req.params.idUsuario;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                estado_Post: false,
                err
            });
        } else {
            res.json({
                estado_Post: true,
                usuario: usuarioDB //este es el usuario que se graba en DB
            });
        }

    })
});

//DELETE usuario
app.delete('/usuario/:idUsuario', function(req, res) {

    let id = req.params.idUsuario;
    let body = {
        estado: false
    }
    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                estado_Post: false,
                err
            });
        } else if (usuarioDB == null) {
            return res.status(400).json({
                estado_Post: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        } else {
            res.json({
                estado_Post: true,
                usuario: usuarioDB //este es el usuario que se elimina de DB
            });
        }

    })


});

module.exports = app;