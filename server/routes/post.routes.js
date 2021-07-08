const express = require('express')
const router = express.Router()
const { authAccessToken } = require('../middlewares/authAccessToken')
const {
  addComment,
  getAllComments,
  updateComment,
  deleteComment } = require('../controllers/comment.controller')
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  reactionToPost } = require('../controllers/post.controller')

// routes for posts
router.get('/', authAccessToken, getAllPosts)
router.get('/:postId', authAccessToken, getPostById)
router.post('/create', authAccessToken, createPost)
router.put('/:postId', authAccessToken, updatePost)
router.delete('/:postId', authAccessToken, deletePost)

// routers for comments
router.get('/:postId/comment', authAccessToken, getAllComments)
router.put('/:postId/comment', authAccessToken, addComment)
router.put('/:postId/comment/:commentId', authAccessToken, updateComment)
router.delete('/:postId/comment/:commentId', authAccessToken, deleteComment)

// routers for add or remove like
router.patch('/:postId', authAccessToken, reactionToPost)

module.exports = router
