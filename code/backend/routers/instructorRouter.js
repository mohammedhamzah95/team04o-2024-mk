const { Router } = require('express');
const router = Router();
const {getInstructor, getInstructors } = require('../controllers/instructorController');
const verifyToken=require('../middleware/checkToken')


router.get('/instructors/:name',verifyToken, getInstructor);
router.get('/instructors',verifyToken, getInstructors);
module.exports = router;
