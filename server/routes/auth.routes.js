const express = require('express')
const router = express.Router()
const { login, newAccessToken, revokeToken, isVerified } = require('../controllers/auth.controller')
const { authRefreshToken } = require('../middlewares/authRefreshToken')
const { headers } = require('../middlewares/headers')


// user log in, assign token
router.post('/auth/login', login)

// issue new access token 
router.post('/auth/token', authRefreshToken, newAccessToken )

router.post('/auth/token/verification', authRefreshToken, isVerified )

router.put('/auth/token/revoke', authRefreshToken, revokeToken)

module.exports = router
