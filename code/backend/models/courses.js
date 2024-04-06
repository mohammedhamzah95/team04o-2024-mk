const {sequelize}=require('../config/connection')
const {DataTypes}=require('sequelize')
const Instructor = require('./instructor');

const Course = sequelize.define('Course', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  code: {
      type: DataTypes.STRING,
      allowNull: false
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  }
});


  module.exports=Course