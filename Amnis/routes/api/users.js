// Defines the express routes to do GET, POST, PUT, and DELETE requests
// pertaining to users.

const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access Public
router.get('/', (req, res) => {
	User.find()
		.sort({name: -1})
		.then(users => res.json(users))
});

// @route GET api/users/:id
// @desc Get specific user by ID
// @access Public
router.get('/:id', (req, res) => {
	User.findOne({ googleUserID: req.params.id })
		.then(user => res.json(user))
		.catch(err => res.status(404).json({failure:true}));
});

// @route POST api/users
// @desc Add a new user
// @access Public
router.post('/', (req, res) => {
	const newUser = new User({
		name: req.body.name,
		googleUserID: req.body.googleUserID
    });
    if(req.body.isProfessor)
    {
        newUser.isProfessor = req.body.isProfessor;
    }
	
	newUser.save().then(user => res.json(user));
});

// @route DELETE api/users/:id
// @desc Delete a user
// @access Public
router.delete('/:id', (req, res) => {
	User.findByID(req.params.id)
		.then(user => user.remove().then(()=>res.json({success: true})))
		.catch(err => res.status(404).json({success:false}));
});

module.exports = router;