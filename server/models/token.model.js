const mongoose = require('mongoose')
const User = require('./user.model')

const tokenSchema = new mongoose.Schema({
    token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    expires: Date,
    revoked: Date
})

tokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expires
})

tokenSchema.virtual('isActive').get(function () {
    return !this.revoked && !this.isExpired
})

module.exports = mongoose.model('RefreshToken', tokenSchema)