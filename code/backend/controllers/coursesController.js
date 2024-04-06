const Course = require('../models/courses');

const getCoursesAndInstructors = async (req, res) => {
    
};

const getAllCourses = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findOne({ where: { id } });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const instructors = await course.getInstructors();
        res.status(200).json({ course, instructors });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Server error" });
    }
};
