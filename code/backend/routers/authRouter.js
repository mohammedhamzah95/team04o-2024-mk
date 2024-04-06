const {register,login} =require('../controllers/authController')
const {Router}=require('express')
const router=Router()
const verifyToken=require('../middleware/checkToken')

router.post('/register',register)
router.post('/login',login)
router.get('/check-token', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
});

module.exports=router