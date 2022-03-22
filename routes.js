const express = require('express');
const userController = require('./src/controller/UserController');

const routes = new express.Router();

routes.get( '/list', userController.index );
routes.post( '/register', userController.create );
routes.put( '/update', userController.update );
routes.delete( '/delete/:id', userController.delete );

routes.post( '/authenticate', userController.authenticate );

module.exports = routes;