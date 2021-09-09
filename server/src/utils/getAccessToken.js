const jwt = require('jsonwebtoken')

exports.getAccessToken = function(_id){
  const privateKey = process.env.JWT_SECRET_KEY
  return jwt.sign({ _id }, privateKey, { expiresIn: '1d' })
}