const { Router } = require('express');
const router = Router();
const { getAllCourses,getCoursesAndInstructors } = require('../controllers/coursesController');
const verifyToken=require('../middleware/checkToken')

router.get('/courses',verifyToken, getAllCourses);
router.get('/courses/:id',verifyToken, getCoursesAndInstructors);


module.exports = router;