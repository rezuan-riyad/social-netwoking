const express = require('express')
const router = express.Router()
const { createUser, login, getProfile, getAllUsers } = require('../controllers/user.controller')
const { authAccessToken } = require('../middlewares/authAccessToken')

//register a new user
router.post('/user/create', createUser)

//get user data and all posts
router.get('/user/:username', authAccessToken, getProfile)

//get all users/authors list
router.get('/users', authAccessToken, getAllUsers)

module.exports = router
