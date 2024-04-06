
const bcrypt = require('bycrypt')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        // Code for user registration
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
		