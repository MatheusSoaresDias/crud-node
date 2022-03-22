const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const db = require('../database/db');
const hash = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, hash.secret, {
    expiresIn: 86400,})
}

module.exports = {
    async create( req, res ) {
        await db.sync();

        const { email } = req.body;

        try {
            if(await User.findOne({ where: { email } }))
                return res.status(400).send({ error: 'User already exists.' });

            const userCreated = await User.create( req.body );
        
            userCreated.password = undefined;
            
            return res.status( 200 ).send({ userCreated, token: generateToken({ id: userCreated.id }) });
        } catch ( error ) {
            console.log( error );

            return res.status( 400 ).send({ error: error.message });
        }
    },

    async index( req, res ) {
        try {
            const users = await User.scope('withoutPassword').findAll();

            return res.status( 200 ).send({ users, user: req.userId });
        } catch ( error ) {
            console.log( error.message );
            return res.status( 400 ).send({ error: 'bad request' });
        }
    },

    async update( req, res ) {
        try {
            const { id, name } = req.body;

            const updatedUser = await User.update({ name }, { where: { id } });

            return res.status(200).json({ success: 'User updated.' });
        } catch ( error ) {
            console.log( error.message );

            return res.status( 400 ).send({ error: 'Bad request.' });
        }
    },

    async delete( req, res ) {
        try {
            const { id } = req.params;

            if ( !id ) {
                return res.status( 400 ).json({ error: 'No Id specified..' });
            }

            await User.destroy({
                where: {
                    id
                }
            });

            return res.status( 200 ).json({ success: 'User deleted.' });
        } catch ( error ) {
            console.log( error.message );

            return res.status( 400 ).send({ error: 'Error deleting user.' });
        }
    },

    async authenticate( req, res ) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user)
            return res.status(400).send({ error: 'User not found.' });

        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Incorrect password.' });

        user.password = undefined;

        return res.status(200).send({ user, token:  generateToken({ id: user.id })});
    }
}