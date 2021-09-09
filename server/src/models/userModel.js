const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

//password hashing
userSchema.virtual('hash_password').set(function (password) {
  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(password, salt)
})

userSchema.methods = {
  passCheck: function (pass) {
    return bcrypt.compareSync(pass, this.password)
  }
}

module.exports = mongoose.model('User', userSchema)