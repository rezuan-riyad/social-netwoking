const Post = require('../models/postModel')

/*
  @desc find post by id, then populate commentedBy property
  @route GET /api/post/:postId/comment
  @access Private
*/
exports.getAllComments = async function (req, res, next) {
  const postId = req.params.postId
  try {
    const post = await Post.findById(postId)
    if (post) {
      post.populate('comments.commentedBy', 'username')
        .execPopulate((err, post) => {
          if (err) next(err)
          else {
            return res.status(200).json({
              comments: post.comments
            })
          }
        })
    } else {
      throw new Error('Something went wrong.')
    }
  } catch (error) {
    next(error)
  }
}


/*
  @desc create a comment
  @route PUT /api/post/:postId/comment
  @access Private
*/
// To add comment, we are updating post
exports.addComment = async function (req, res, next) {
  if(!req.body.content){
    return res.status(400).json({ message: 'Content is Empty.' })
  }
  const postId = req.params.postId
  const query = { _id: postId }
  const update = {
    $push: {
      comments: {
        content: req.body.content,
        commentedBy: req.user._id
      },
    }
  }

  try {
    const updatedPost = await Post.findOneAndUpdate(query, update, { new: true })
      .populate('comments.commentedBy', 'username')

    if (updatedPost) {
      return res.status(200).json({ comments: updatedPost.comments })
    } else {
      next(new Error('Something Wrong'))
    }
  } catch (error) {
    next(error)
  }
}

/*
  @desc update a comment
  @route PUT /api/post/:postId/comment/:commentId
  @access Private (commenter only)
*/
exports.updateComment = async function (req, res, next) {
  const { postId, commentId } = req.params
  try {
    //find post by postId
    const post = await Post.findById(postId)
    if(!post){
      res.status(404)
      throw new Error('Post doesn\'t exist.')
    }

    //find comment by commentId
    const comment = await post.comments.id(commentId)
    if(!comment){
      res.status(404)
      throw new Error('Comment doesn\'t exist.')
    }

    const isCommenter = comment.commentedBy.equals(req.user._id)

    // commenter is only allowed to edit comment.
    if (isCommenter) {
      comment.content = req.body.content
      const edited = await post.save()
      if (edited) {
        return res.status(200).json({ message: "Comment Edited Successfully." })
      } else {
        res.status(400)
        throw new Error('Something Went Wrong.')
      }
    } else {
      res.status(401)
      throw new Error('Not allowed to edit comment.')
    }
  } catch (error) {
    next(error)
  }
}

/*
  @desc delete a comment
  @route DELETE /api/post/:postId/comment/:commentId
  @access Private
*/
exports.deleteComment = async function (req, res, next) {
  const { postId, commentId } = req.params
  try {
    //find post by postId
    const post = await Post.findById(postId)
    if(!post){
      res.status(404)
      throw new Error('Post doesn\'t exist.')
    }

    // find comment by commentId
    const comment = await post.comments.id(commentId)
    if(!comment){
      res.status(404)
      throw new Error('Comment doesn\'t exist.')
    }

    const isCommenter = comment.commentedBy.equals(req.user._id)
    const isAuthor = post.author.equals(req.user._id)

    // commenter and author, allowed to delete comment.
    if (isCommenter || isAuthor) {
      const deleted = await comment.remove()
      if(deleted){
        const _post = await post.save()
        res.status(200).json({ message: "Comment deleted successfully." })
      }
    } else {
      res.status(401)
      throw new Error('Not allowed to edit comment.')
    }
  } catch (error) {
    next(error)
  }
}
