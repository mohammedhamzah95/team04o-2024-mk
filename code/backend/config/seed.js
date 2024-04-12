require('./associations')

const { sequelize } = require('./connection');
const Course = require('../models/courses');
const Instructor = require('../models/instructor');
const User = require('../models/users')
const Review = require('../models/reviews')
const { faker } = require('@faker-js/faker')
const generateFakeUserData = () => {
  return {

    name: faker.internet.userName(),
    email: faker.internet.email(),
    googleId: faker.string.uuid()
  };
};

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



const reviews = [
  { userId: 1, instructorId: 6, rating: 5, content: "That Vinh Khang's Ethics of Migration course was insightful, but I found some concepts challenging to grasp." },
  { userId: 2, instructorId: 7, rating: 3, content: "Benjamin D. Zion's Principles of Chem I course was interesting, but the pace of the lectures was a bit fast for me." },
  { userId: 3, instructorId: 8, rating: 2, content: "Cinthya Osuna's teaching style in Principles of Chem I was engaging, but I wished there were more hands-on experiments." },
  { userId: 4, instructorId: 9, rating: 3, content: "Tanya Bekyarova's Human biology course provided a good overview, but I felt the assessments were too challenging." },
  { userId: 5, instructorId: 10, rating: 3, content: "Yuting Lin's explanations in Human biology were clear, but I struggled to keep up with the workload." },
  { userId: 6, instructorId: 11, rating: 4, content: "Andrew Howard's Biochemistry course was informative, but I found some topics too complex to understand." },
  { userId: 7, instructorId: 12, rating: 5, content: "Rajendra Goswami's Biochemistry course was well-organized, but I wish there were more opportunities for group discussions." },
  { userId: 8, instructorId: 13, rating: 3, content: "Mina Rezaeian's Design Communications II course had interesting assignments, but I struggled with the software tools." },
  { userId: 9, instructorId: 14, rating: 2, content: "Dillon Pranger's Design Communications II course was practical, but I felt the lectures lacked depth." },
  { userId: 10, instructorId: 15, rating: 3, content: "Katerina Ilievska's Technical Communication course was helpful, but I wish there were more interactive activities." },
  { userId: 11, instructorId: 16, rating: 3, content: "Andrew Roback's Technical Communication course provided useful tips, but I found the assignments repetitive." },
  { userId: 12, instructorId: 1, rating: 3, content: "Kevin Vaccaro's Database Security course was informative, but I struggled to apply the concepts to real-world scenarios." },
  { userId: 13, instructorId: 2, rating: 3, content: "Maurice Dawson's teaching in Database Security was engaging, but I wish there were more practical exercises." },
  { userId: 14, instructorId: 3, rating: 4, content: "Wang Xialong's Object-Oriented Programming II course was challenging, but I appreciated the instructor's availability for questions." },
  { userId: 15, instructorId: 4, rating: 3, content: "M. Yousef Elmehdwi's lectures in Object-Oriented Programming II were informative, but I found the assignments too time-consuming." },
  { userId: 16, instructorId: 5, rating: 3, content: "Hannah R. Muller's Ethics of Migration course sparked interesting discussions, but I wished there were more readings to supplement the lectures." },
  { userId: 4, instructorId: 6, rating: 3, content: "That Vinh Khang's insights in the Ethics of Migration course were thought-provoking, but I struggled to keep up with the readings." },
  { userId: 5, instructorId: 7, rating: 4, content: "Benjamin D. Zion's Principles of Chem I course provided a good foundation, but I found some topics repetitive." },
  { userId: 1, instructorId: 8, rating: 3, content: "Cinthya Osuna's explanations in Principles of Chem I were clear, but I wished there were more demonstrations in the lab." },
  { userId: 9, instructorId: 9, rating: 2, content: "Tanya Bekyarova's Human biology course was interesting, but I found the assessments too heavily weighted." },
  { userId: 7, instructorId: 10, rating: 3, content: "Yuting Lin's teaching style in Human biology was engaging, but I wished there were more group activities." },
  { userId: 6, instructorId: 11, rating: 4, content: "Andrew Howard's Biochemistry course was challenging, but I appreciated the instructor's availability for extra help." },
  { userId: 2, instructorId: 12, rating: 3, content: "Rajendra Goswami's Biochemistry course provided a good overview, but I struggled with some of the concepts." },
  { userId: 4, instructorId: 13, rating: 3, content: "Mina Rezaeian's Design Communications II course had interesting projects, but I wished there were more guest speakers." },
  { userId: 3, instructorId: 14, rating: 5, content: "Dillon Pranger's Design Communications II course was practical, but I found the workload overwhelming." },
  { userId: 1, instructorId: 15, rating: 3, content: "Katerina Ilievska's Technical Communication course provided useful insights, but I wished there were more hands-on activities." },
  { userId: 9, instructorId: 16, rating: 3, content: "Andrew Roback's Technical Communication course was informative, but I struggled with some of the assignments." },
  { userId: 10, instructorId: 1, rating: 3, content: "Kevin Vaccaro's Database Security course was challenging, but I felt the assessments were fair." },
  { userId: 16, instructorId: 2, rating: 3, content: "Maurice Dawson's teaching in Database Security was engaging, but I wished there were more opportunities for collaboration." },
  { userId: 14, instructorId: 3, rating: 3, content: "Wang Xialong's Object-Oriented Programming II course was informative, but I found the pace of the lectures too fast." },
  { userId: 11, instructorId: 4, rating: 3, content: "M. Yousef Elmehdwi's lectures in Object-Oriented Programming II were insightful, but I struggled to keep up with the material." },
  { userId: 12, instructorId: 5, rating: 4, content: "Hannah R. Muller's Ethics of Migration course was thought-provoking, but I wished there were more opportunities for debate." },
  { userId: 9, instructorId: 6, rating: 3, content: "That Vinh Khang's insights in the Ethics of Migration course were enlightening, but I found some topics challenging to understand." },
  { userId: 16, instructorId: 7, rating: 3, content: "Benjamin D. Zion's Principles of Chem I course was informative, but I wished there were more practical experiments." },
  { userId: 12, instructorId: 8, rating: 3, content: "Cinthya Osuna's explanations in Principles of Chem I were clear, but I struggled with the mathematical aspects." },
  { userId: 14, instructorId: 9, rating: 3, content: "Tanya Bekyarova's Human biology course was interesting, but I found the textbook readings lengthy." },
  { userId: 7, instructorId: 1, rating: 4, content: "The Database Security course taught by Kevin Vaccaro was informative and well-structured. I gained valuable insights into securing databases and managing access controls." },
  { userId: 2, instructorId: 2, rating: 4, content: "Maurice Dawson's approach to teaching Database Security was commendable. His depth of knowledge and real-world examples made the concepts easy to understand." },
  { userId: 7, instructorId: 3, rating: 4, content: "Object-Oriented Programming II with Wang Xialong was an enriching experience. His clear explanations and hands-on approach greatly enhanced my understanding of OOP concepts." },
  { userId: 2, instructorId: 4, rating: 4, content: "M. Yousef Elmehdwi's guidance in Object-Oriented Programming II was invaluable. His passion for teaching and expertise in the subject matter were evident in every lecture." },
  { userId: 5, instructorId: 5, rating: 4, content: "Hannah R. Muller's Ethics of Migration course provided a thought-provoking exploration of ethical issues related to migration. Her engaging teaching style kept me captivated throughout the semester." },
  { userId: 11, instructorId: 6, rating: 4, content: "That Vinh Khang's insights in the Ethics of Migration course were eye-opening. His depth of knowledge and ability to foster class discussions made the learning experience truly enriching." },
  { userId: 10, instructorId: 7, rating: 4, content: "Benjamin D. Zion's Principles of Chem I course was challenging yet rewarding. His passion for chemistry and dedication to student learning were evident in every lecture." },
  { userId: 3, instructorId: 8, rating: 4, content: "Cinthya Osuna's teaching in Principles of Chem I was exceptional. Her ability to simplify complex concepts and provide practical examples made the subject more accessible." },
  { userId: 6, instructorId: 9, rating: 4, content: "Tanya Bekyarova's Human biology course was fascinating. Her enthusiasm for the subject and engaging teaching style made learning about human biology enjoyable." },
  { userId: 7, instructorId: 10, rating: 4, content: "Yuting Lin's approach to teaching Human biology was impressive. Her clear explanations and use of multimedia resources enhanced my understanding of complex biological concepts." },
  { userId: 14, instructorId: 11, rating: 4, content: "Andrew Howard's Biochemistry course was intellectually stimulating. His expertise in the subject matter and interactive teaching methods made the course one of my favorites." },
  { userId: 11, instructorId: 12, rating: 4, content: "Rajendra Goswami's Biochemistry course was both challenging and rewarding. His dedication to student learning and insightful explanations helped me grasp difficult biochemical concepts." },
  { userId: 2, instructorId: 13, rating: 4, content: "Mina Rezaeian's Design Communications II course was inspiring. Her creative approach to teaching and constructive feedback helped me develop my design skills." },
  { userId: 15, instructorId: 14, rating: 4, content: "Dillon Pranger's expertise in Design Communications II was evident throughout the course. His industry insights and practical assignments enhanced my understanding of graphic design principles." },
  { userId: 14, instructorId: 15, rating: 4, content: "Katerina Ilievska's Technical Communication course was invaluable for improving my communication skills. Her structured approach to teaching and real-world examples made the material relatable." },
  { userId: 16, instructorId: 16, rating: 4, content: "Andrew Roback's Technical Communication course provided practical insights into effective communication strategies. His constructive feedback and interactive lectures were instrumental in honing my writing skills." }

];




(async () => {
  try {

    await sequelize.sync({ force: true }); 
    for (const courseData of coursesData) {
      const course = await Course.create(courseData);
      const instructors = await Promise.all(courseData.instructors.map(name =>
        Instructor.findOrCreate({ where: { name } })
      ));
      await course.addInstructors(instructors.map(instructor => instructor[0]));
    }
    const fakeUsers = [];

    for (let i = 0; i < 16; i++) {
      const userData = generateFakeUserData();
      const user = await User.create(userData);
      fakeUsers.push(user);
    }


    reviews.forEach(review => Review.create({
      userId: review.userId,
      instructorId: review.instructorId,
      rating: review.rating,
      content: review.content
    }))


    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
})();