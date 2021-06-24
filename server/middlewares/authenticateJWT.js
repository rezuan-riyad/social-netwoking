const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.authenticateJWT = async function(req, res, next) {
  let token

  if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = await User.findById(decoded._id)
      next()

    } catch (error) {
      next(error)
    }
  }

  if (!token) {
    res.status(401)
    const err = new Error('No Token, Log in first')
    next(err)
  }
}
