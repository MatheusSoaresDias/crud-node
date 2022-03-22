const express = require('express');
const authMiddleware = require('./src/middleware/auth');

const app = express();

app.use( authMiddleware );
app.use( express.json() );
app.use( require( './routes' ) );

app.listen( 3333 );