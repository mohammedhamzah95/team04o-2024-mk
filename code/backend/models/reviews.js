const {sequelize}=require('../config/connection')
const {DataTypes}=require('sequelize')

const Review = sequelize.define('Review', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  
 module.exports=Review