const Sequelize = require("sequelize");
const dotenv=require('dotenv')
dotenv.config()

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});



sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports={sequelize}