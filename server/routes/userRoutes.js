const express = require('express')
const router = express.Router()
const { createUser, login, getProfile } = require('../controllers/userController')


router.post('/user/create', createUser)
router.post('/user/login', login)

//get user data and all posts
router.get('/user/:username', getProfile)

module.exports = router