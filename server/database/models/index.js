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

const { user, store, menu, cart, cart_menu, store_review } = sequelize.models;
store.belongsTo(user, { foreignKey: 'user_id' });
user.hasMany(store, { foreignKey: 'user_id' });
menu.belongsTo(store, { foreignKey: 'store_id' });
store.hasMany(menu, { foreignKey: 'store_id' });
cart.belongsTo(user, { foreignKey: 'buyer_id' });
user.hasMany(cart, { foreignKey: 'buyer_id' });
menu.belongsToMany(cart, { foreignKey: 'cart_id', through: cart_menu });
cart.belongsToMany(menu, { foreignKey: 'menu_id', through: cart_menu });
cart_menu.belongsTo(cart, { foreignKey: 'cart_id' });
cart.hasMany(cart_menu, { foreignKey: 'cart_id' });
cart_menu.belongsTo(menu, { foreignKey: 'menu_id' });
menu.hasMany(cart_menu, { foreignKey: 'menu_id' });
store.hasMany(store_review, { foreignKey: 'store_id' });
store_review.belongsTo(store, { foreignKey: 'store_id' });
user.hasMany(store_review, { foreignKey: 'reviewer_id' });
store_review.belongsTo(user, { foreignKey: 'reviewer_id' });

module.exports = db;
