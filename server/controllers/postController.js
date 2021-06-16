const Post = require('../models/postModel')

/*
  @desc get all posts (all users)
  @route GET /api/post
  @access Private
*/
exports.getAllPosts = async function (req, res, next) {
  Post.find()
    .populate('author', 'username')
    .populate('comments.commentedBy', 'username')
    .exec((error, posts) => {
      if (error) next(error)
      else if (posts) {
        return res.status(200).json({ posts: posts })
      }
    })
}

/*
  @desc get a post by id (all users)
  @route GET /api/post/:postId
  @access Private
*/
exports.getPostById = async function (req, res, next) {
  Post.findById(req.params.postId)
    .populate('author', 'username')
    .populate('comments.commentedBy', 'username')
    .exec((error, post) => {
      if (error) next(error)
      else if (post) {
        return res.status(200).json({ post })
      }
    })
}


/*
  @desc create new post (all users)
  @route POST /api/post/create
  @access Private
*/
exports.createPost = async function (req, res, next) {

  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user._id
    })

    if (newPost) {
      return res.status(200).json({ post: newPost })
    }
  } catch (error) {
    next(error)
  }
}

/* 
  @desc update a post by id (only author)
  @route PUT /api/post/:postId
  @access Private
*/

exports.updatePost = async function (req, res, next) {
  const { title, content } = req.body
  if (!title || !content) {
    const error = new Error('title and content are required.')
    res.status(400)
    return next(error)
  }
  const query = {
    _id: req.params.postId,
    author: req.user._id
  }
  const update = {
    $set: { title, content }
  }
  try {
    const post = await Post.findOneAndUpdate(query, update, { new: true })
    if (post) {
      return res.status(200).json({ post })
    } else {
      res.status(401)
      throw new Error('Not Allowed to update.')
    }
  } catch (error) {
    next(error)
  }
}

/* 
  @desc delete a post by id (only author)
  @route DELETE /api/post/:postId
  @access Private
*/
exports.deletePost = async function (req, res, next) {
  const query = {
    _id: req.params.postId,
    author: req.user._id
  }
  try {
    const post = await Post.findOneAndDelete(query)
    if (post) {
      return res.status(200).json({ message: "Deleted Successfully." })
    } else {
      res.status(401)
      throw new Error('Not Allowed to Delete.')
    }
  } catch (error) {
    next(error)
  }
}

/*
  @desc increment/decrement likes and add/remvove likers
  @route PATCH /api/post/:postId
  @access Private
*/
exports.reactionToPost = async function (req, res, next) {
  const postId = req.params.postId
  const perpatrator = req.user.username  // :)

  try{
    let update, message
    if (req.body.action === 'addLike') {
      update = {
        $inc: { totalLikes: 1 },
        $addToSet: { likers: perpatrator }
      }
      message = 'Like Added'
    } else if(req.body.action == 'removeLike'){
      update = {
        $inc: { totalLikes: -1 },
        $pull: { likers: perpatrator }
      }
      message = 'Like Removed.'
    }
    const post = await Post.findByIdAndUpdate( postId, update, { new: true })
    if(post) {
      return res.status(200).json({ post })
    } 
  }catch(error){
    next(error)
  }
}