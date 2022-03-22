const jwt = require('jsonwebtoken');
const hash = require('../config/auth.json');

module.exports = ( req, res, next ) => { 
    const authHeader = req.headers.authorization;

    if( ( req.originalUrl == '/authenticate' ) || ( req.originalUrl == '/register' ) )
        return next();

    if(!authHeader)
        return res.status(401).send({ error: 'Token not provided.' });

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error.' });

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted.' });

    jwt.verify(token, hash.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token invalid.' });

        req.userId = decoded.id;

        return next();
    })
}