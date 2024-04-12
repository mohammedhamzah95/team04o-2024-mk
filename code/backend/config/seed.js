require('./associations')

const { sequelize } = require('./connection');
const Course = require('../models/courses');
const Instructor = require('../models/instructor');

const coursesData = [
  { id: 1, code: 'ITMS 428', name: 'Database Security', instructors: ["Kevin Vaccaro", "Maurice Dawson"] },
  { id: 2, code: 'CS 116', name: 'Object-Oriented Programming II', instructors: ["Wang Xialong", "M. Yousef Elmehdwi"] },
  { id: 3, code: 'HUM 200', name: 'Ethics of Migration', instructors: ["Hannah R. Muller", "That Vinh Khang"] },
  { id: 4, code: 'CHEM 124', name: 'Principles of Chem I', instructors: ["Benjamin D. Zion", "Cinthya Osuna"] },
  { id: 5, code: 'BIOL 115', name: 'Human biology', instructors: ["Tanya Bekyarova", "Yuting Lin"] },
  { id: 6, code: 'BIOL 403', name: 'Biochemistry', instructors: ["Andrew Howard", "Rajendra Goswami"] },
  { id: 7, code: 'ARCH 108', name: 'Design Communications II', instructors: ["Mina Rezaeian", "Dillon Pranger"] },
  { id: 8, code: 'COM 421', name: 'Technical Communication', instructors: ["Katerina Ilievska", "Andrew Roback"] }
];


(async () => {
  try {

    for (const courseData of coursesData) {
      const course = await Course.create(courseData);
      const instructors = await Promise.all(courseData.instructors.map(name =>
        Instructor.findOrCreate({ where: { name } })
      ));
      await course.addInstructors(instructors.map(instructor => instructor[0]));
    }

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
})();