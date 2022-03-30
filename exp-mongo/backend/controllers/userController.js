/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { json } = require('body-parser');
// @desc Register User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const {name, email, password} = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}
	
	//check user exists
	const userExists = await User.findOne({
		email
	});

	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}
    
	//hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	//create user
	const user = await User.create({
		name, 
		email,
		password: hashedPassword
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id)
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Authenticate User
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const {email, password} = req.body;
	const user = await User.findOne({
		email
	});

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id)

		});
	} else {
		res.status(400);
		throw new Error('Invalid credentials');
	}
    
	res.json({
		message: 'Login User'
	});
});

// @desc Get User
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
	res.json({
		message: 'User data display'
	});
});

//Generate JWT

const generateToken = (id ) => {
	return jwt.sign({
		id
	}, process.env.JWT_SECRET, {
		expiresIn: '30d'
	});
};

module.exports = {
	registerUser,
	loginUser,
	getMe
};