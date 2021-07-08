const jwt = require('jsonwebtoken')

exports.getAccessToken = async function(_id){
  const privateKey = process.env.ACCESS_TOKEN_SECRET
  return jwt.sign({ _id }, privateKey, { expiresIn: '1m' })
}

exports.getRefreshToken = async function(payload){
  const privateKey = process.env.REFRESH_TOKEN_SECRET
  return jwt.sign({ payload }, privateKey, { expiresIn: '1d' })
}