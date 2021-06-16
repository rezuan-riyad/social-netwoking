const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/userModel')

const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  commentedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [commentSchema],
  likers: {
    type: [String],
  },
  totalLikes: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true })

// postSchema.virtual('totalComments').get(function() {
//   return this.comments.length()
// });

module.exports = mongoose.model('Post', postSchema)