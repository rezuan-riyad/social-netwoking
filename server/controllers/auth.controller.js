const RefreshToken = require('../models/token.model')
const User = require('../models/user.model')
const { getAccessToken, getRefreshToken } = require('../utils/getToken')
const { setCookies } = require('../utils/setCookies')

/** 
 * @desc user login
 * @route POST /api/auth/login
 * @access Public
 */
exports.login = async function (req, res, next) {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user) {
      if (user.passCheck(password)) {
        const _aToken = await getAccessToken(user._id)
        const _rToken = await getRefreshToken({
          _id: user._id,
          username: username
        })

        // clear old cookie, set new one
        // old cookie should be revoked now, (implement later)
        res.clearCookie('refreshToken')
        setCookies(res, _rToken)

        // refresh token is saved to db
        const rToken = await new RefreshToken({
          token: _rToken,
          user: user._id,
          expires: Date.now() + 7*24*60*60*1000
        }).save()

        return res.status(200).json({
          accessToken: _aToken,
          user: user.username
        })

      } else {
        res.status(400)
        return res.json({ message: 'Ivalid username and password combination'})
      }
    } else {
      res.status(404)
      return res.json({ message: 'User doesn\'t exist.' })
    }
  } catch (error) {
    next(error)
  }
}


exports.newAccessToken = async function (req, res, next) {
  try{
    const _aToken = await getAccessToken(req.user._id)
    return res.status(200).json({ accessToken: _aToken })
  }catch (error){
    next(error)
  }
}

exports.isVerified = function (req, res) {
  return res.status(200).json({ message: "Verified" })
}

exports.revokeToken = async function(req, res, next){
  try{
    const token = req.RefreshToken.token
    const update = {
      $set: {
        revoked: new Date(Date.now())
      }
    }
    const rToken = await RefreshToken.findOneAndUpdate({ token }, update, { new: true })
    console.log(rToken)
    if(rToken){
      return res.status(200).json({ rToken, message: "Token Revoked"})
    } else {
      return next( new Error('Something went wrong'))
    }
  }catch(error){
    next(error)
  }
}