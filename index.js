const express = require('express');
const userController = require('./src/controller/UserController');

const app = express();

app.use( express.json() );

app.get( '/list', userController.index );
app.post( '/create', userController.create );
app.put( '/update', userController.update );
app.delete( '/delete/:id', userController.delete );

app.listen( 3333 );