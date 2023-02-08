const { Sequelize, Model, DataTypes } = require('sequelize');


const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});

const User          = sequelize.define('User', {
  email   : DataTypes.STRING,
  name    : DataTypes.STRING,
  password: DataTypes.STRING,
  role    : DataTypes.STRING,
});

// async function a() {await sequelize.sync()}
// a();

module.exports = User;
//const users = await User.findAll();


