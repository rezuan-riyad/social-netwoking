const express = require('express')
const router = express.Router()
const { authenticateJWT } = require('../middlewares/authenticateJWT')
const {
  addComment,
  getAllComments,
  updateComment,
  deleteComment } = require('../controllers/commentController')
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  reactionToPost } = require('../controllers/postController')

// routes for posts
router.get('/', authenticateJWT, getAllPosts)
router.get('/:postId', authenticateJWT, getPostById)
router.post('/create', authenticateJWT, createPost)
router.put('/:postId', authenticateJWT, updatePost)
router.delete('/:postId', authenticateJWT, deletePost)

// routers for comments
router.get('/:postId/comment', authenticateJWT, getAllComments)
router.put('/:postId/comment', authenticateJWT, addComment)
router.put('/:postId/comment/:commentId', authenticateJWT, updateComment)
router.delete('/:postId/comment/:commentId', authenticateJWT, deleteComment)

// routers for add or remove like
router.patch('/:postId', authenticateJWT, reactionToPost)

module.exports = router
