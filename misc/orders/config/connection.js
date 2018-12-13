//**************************************

// Dependencies
var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize("example_db", "root", "password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  freezeTableName: true,
  operatorAliases: false,
  //sets minimum of 0 connections and a maximum of 5 connections
  //performance enhancement feature
  //"connection pooling"
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;