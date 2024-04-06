const Review = require('../models/reviews');
const Instructor = require('../models/instructor');

const getInstructor = async (req, res) => {
    
    try {
        const { name } = req.params;
        const instructor = await Instructor.findOne({ where: { name } });
        res.status(200).json(instructor);
    } catch (error) {
        console.error('Error fetching Instructor', error);
        res.status(500).json({ message: 'Server error' });
    }

module.exports = {
    getInstructor,
    getInstructors
};
