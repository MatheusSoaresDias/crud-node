const Sequelize = require('sequelize');
const sequelize = new Sequelize('crud_user', 'postgres', 'user', {
    dialect: 'postgres',
    host: 'localhost'
});

module.exports = sequelize;