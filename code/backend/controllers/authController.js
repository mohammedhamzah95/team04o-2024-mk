
const bcrypt = require('bcrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword)
        await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.json({message:"User Registered!"})

    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: '2d' });

        res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports={
    register,login
}






