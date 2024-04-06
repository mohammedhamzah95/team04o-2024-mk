const Review = require('../models/reviews');
const User = require('../models/users');

const createInstructorReview = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
        const { instructorId } = req.params;

        const review = await Review.create({
            userId,
            instructorId,
            rating,
            content: comment
        });

        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        console.error('Error creating tutor review:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getInstructorReviews = async (req, res) => {
    
};

module.exports = {
    createInstructorReview,
    getInstructorReviews
};
