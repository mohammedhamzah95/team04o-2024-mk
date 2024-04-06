const {sequelize}=require('../config/connection')
const Sequelize=require('sequelize')

const Instructor = sequelize.define('Instructor', {
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  });


module.exports=Instructor