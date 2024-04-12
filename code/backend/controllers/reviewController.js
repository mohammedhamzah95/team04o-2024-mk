const Review = require('../models/reviews');
const User = require('../models/users');
const router = require('../routers/instructorRouter');

const createInstructorReview = async (req, res) => {
    try {
        const { userId, rating, comment } = req.body;
     
        const { instructorId } = req.params

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
    try {
        const { instructorId } = req.params;

        const reviews = await Review.findAll({
            where: { instructorId },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }] 
        });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching tutor reviews:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { createInstructorReview, getInstructorReviews };
