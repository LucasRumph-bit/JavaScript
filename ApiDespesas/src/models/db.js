const { Sequelize } = require('sequelize');

require('dotenv').config();

console.log('Configurações de conexão:', {
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
});

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    loggin: (msg) => console.log('[SQL}', msg)
});

module.exports = {
    sequelize
};