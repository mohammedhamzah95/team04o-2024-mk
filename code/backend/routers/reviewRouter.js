const express = require('express');
const router = express.Router();
const { createInstructorReview, getInstructorReviews } = require('../controllers/reviewController');
const verifyToken=require('../middleware/checkToken')

router.post('/instructors/:instructorId/reviews',verifyToken, createInstructorReview);

router.get('/instructors/:instructorId/reviews',verifyToken, getInstructorReviews);

module.exports = router;