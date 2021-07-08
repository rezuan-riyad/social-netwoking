const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const RefreshToken = require('../models/token.model')

exports.authRefreshToken = async function (req, res, next) {
    try {
        const rToken = req.cookies.refreshToken // || req.body.refreshToken
        const decoded = jwt.verify(rToken, process.env.REFRESH_TOKEN_SECRET)
        req.user = {
            _id: decoded.payload._id,
            username: decoded.payload.username
        }
        const query = { 
            user: decoded.payload._id,
            token: rToken
        }
        const token = await RefreshToken.findOne(query)
        
        // if token exist and active, this token can issue a new access token
        if(token && token.isActive){
            req.RefreshToken = token
            return next()
        } else {
            return res.status(400).json({ 
                message: "Refresh Token Revoked and inActive. Need to login " 
            })
        }
    } catch (error) {
        return next(error)
    }
}
