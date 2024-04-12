const { register, login,authWithGoogle } = require('../controllers/authController')
const { Router } = require('express')
const router = Router()
const verifyToken = require('../middleware/checkToken')
const passport = require('passport')

router.post('/register',register)
router.post('/login',login)
router.get('/check-token', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
});

router.post('/', authWithGoogle)



module.exports = router