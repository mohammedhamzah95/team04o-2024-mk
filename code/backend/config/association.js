const User = require('../models/users');
const Instructor = require('../models/instructor');
const Review = require('../models/reviews');
const Course = require('../models/courses');


  
Course.belongsToMany(Instructor, { through: 'CourseInstructor' });
Instructor.belongsToMany(Course, { through: 'CourseInstructor' });

Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

Review.belongsTo(Instructor, { foreignKey: 'instructorId' });
Instructor.hasMany(Review, { foreignKey: 'instructorId' });

module.exports = { User, Instructor, Review };