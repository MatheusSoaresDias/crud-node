const Sequelize = require('sequelize');
const db = require('../database/db');
const bcrypt = require('bcryptjs');
const { password } = require('pg/lib/defaults');
const res = require('express/lib/response');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        select: false,
    }
}, {
    scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        }
    }
});

User.beforeCreate(async user => {
    const encryptedPassword = await bcrypt.hash(user.password, 10);
    user.password = encryptedPassword;
});

module.exports = User;