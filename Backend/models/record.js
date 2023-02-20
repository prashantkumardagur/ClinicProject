const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db.sqlite'
});
const Record        = sequelize.define('Record', {
  patient       : DataTypes.STRING, //email foreign key
  doctor        : DataTypes.STRING, //email foreign key
  approvedBy    : DataTypes.STRING, //email foreign key
  date          : DataTypes.STRING, // preferred appointment date  -> process date.toLocaleDateString()
  time          : DataTypes.TIME, // preferred appointment time  -> process date.toLocaleTimeString()
  notes         : DataTypes.STRING,
  status        : DataTypes.STRING,
  prescription  : DataTypes.STRING,
  approved      : DataTypes.STRING

});

// async function a() {await sequelize.sync()}
// a();




module.exports = Record;