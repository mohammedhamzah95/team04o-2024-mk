
const bcrypt = require('bycrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
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
        // Code for user login
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    register,
    login
}
		