const userModel = require('./usuario');
const categoriaModel = require('./categoria');
const expressModel = require('./expense');

const User = userModel.User;
const Categoria = categoriaModel.Categoria;
const Express = expressModel.Express;

User.hasMany(Categoria, {
    foreignKey: 'userId',
    as: 'categoria'
});

Categoria.belongsTo(User, {
    foreignKey: 'userId'
});

Categoria.hasMany(Express, {
    foreignKey: 'categoriaId',
    as: 'despesas'
});
Express.belongsTo(Categoria, {
    foreignKey: 'categoriaId'
});

module.exports = {};
