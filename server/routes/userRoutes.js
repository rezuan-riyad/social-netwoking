const express = require('express')
const router = express.Router()
const { createUser, login, getProfile } = require('../controllers/userController')
const { authenticateJWT } = require('../middlewares/authenticateJWT')

//register a new user
router.post('/user/create', createUser)

// user log in, assign token
router.post('/user/login', login)

//get user data and all posts
router.get('/user/:username', authenticateJWT, getProfile)

module.exports = router