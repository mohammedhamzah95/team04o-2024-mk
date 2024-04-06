const {sequelize} = require('./connection');

const { User, Instructor, Review } = require('./associations');

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });
