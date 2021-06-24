//Error thrown by synchronous code will be handled by
//express by default, for async code error need to be catched.

const Post = require('../models/postModel')
const User = require('../models/userModel')
const { getAccessToken } = require('../utils/getAccessToken')


/*
  @desc get user profile and user's all posts
  @route GET /api/user/:username
  @access Private
*/
exports.getProfile = async function (req, res, next) {
  const { username } = req.params
  try {
    const user = await User.findOne({ username })
    if (user) {
      const posts = await Post.find({ author: user._id })
        .populate('author', 'username')

      return res.status(200).json({
        user: {
          username: user.username,
          date: user.date
        },
        posts
      })
    } else {
      res.status(400)
      next(new Error('Invalid URL'))
    }
  } catch (error) {
    next(error)
  }
}

/*
  @desc get all users
  @route POST /api/users/
  @access Public
*/
exports.getAllUsers = async function(req, res, next){
  try {
    const users = await User.find()
    if(users){
      const _users = users.map(user => {
        return new Object({
          username: user.username,
          _id: user._id
        })
      })
      return res.status(200).json({ users: _users })
    }
  } catch(error){
    next(error)
  }
}


/*
  @desc new user creation
  @route POST /api/user/create
  @access Public
*/

exports.createUser = async function (req, res, next) {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required."
    })
  }

  try {
    const user = await User.findOne({ username })

    if (user) {
      return res.status(200).json({
        message: "User already exists."
      })
    } else {
      const newUser = await User.create({
        username,
        hash_password: password
      })

      if (newUser) {
        return res.status(201).json({
          message: "User created.",
          user: newUser
        })
      }
    }
  } catch (error) {
    next(error)
  }
}

/*
  @desc user login
  @route POST /api/user/login
  @access Public
*/

exports.login = async function (req, res, next) {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (user) {
      if (user.passCheck(password)) {
        return res.status(200).json({
          username: user.username,
          token: getAccessToken(user._id)
        })
      } else {
        res.status(400)
        throw new Error('Ivalid username and password combination')
      }
    } else {
      res.status(404)
      throw new Error('User doesn\'t exist.')
    }
  } catch (error) {
    next(error)
  }
}
