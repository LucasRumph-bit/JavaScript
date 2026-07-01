const { Sequelize } = require('sequelize');

require('dotenv').config();

console.log('Configurações de conexão:', {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: (msg) => console.log('[SQL]', msg)
});

module.exports = {
    sequelize
};