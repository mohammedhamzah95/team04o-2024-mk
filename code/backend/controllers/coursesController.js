const Course = require('../models/courses');

const getCoursesAndInstructors = async (req, res) => {
    
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.status(200).json({ courses });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
    }
};
