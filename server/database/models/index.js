const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const { user, store, menu, cart, cart_menu } = sequelize.models;
store.belongsTo(user);
user.hasMany(store);
menu.belongsTo(store);
store.hasMany(menu);
cart.belongsTo(user, { foreignKey: 'buyer_id' });
user.hasMany(cart);
menu.belongsToMany(cart, { foreignKey: 'cart_id', through: cart_menu });
cart.belongsToMany(menu, { foreignKey: 'menu_id', through: cart_menu });
//다대다 관계설정

module.exports = db;
