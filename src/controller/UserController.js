const User = require('../model/User');

module.exports = {
    async create( req, res ) {
        try {
            const userCreated = await User.create( req.body );
        
            return res.status( 200 ).send({ userCreated });
        } catch ( error ) {
            console.log( error );
            return res.status( 400 ).send({ error: error.message });
        }
    },

    async index( req, res ) {
        try {
            const users = await User.findAll();

            return res.status( 200 ).send({ users });
        } catch ( error ) {
            console.log( error.message );
            return res.status( 400 ).send({ error: 'bad request' });
        }
    },

    async update( req, res ) {
        try {
            const { id, name } = req.body;

            const updatedUser = await User.update({ name }, { where: { id } });

            return res.status(200).json({ updatedUser });
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
    }
}