const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.authAccessToken = async function(req, res, next) {
  let token
  
  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.user = await User.findById(decoded._id)
      return next()

    } catch (error) {
      res.status(401)
      console.log(error.name)
      return next(error)
    }
  }

  if (!token) {
    res.status(401)
    const err = new Error('No Token, Log in first')
    return next(err)
  }
}
